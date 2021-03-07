/* eslint-disable unicorn/prefer-spread */
/* eslint-disable no-console */
import { existsSync, promises as fs } from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import fetch, { Response as FetchResponse } from "node-fetch";
import prettier from "prettier";

async function main() {
	const forceDownload = process.argv.includes("--download");

	let componentCode = "";
	for (const [name, code] of PIECES) {
		console.log("Processing", name);
		const svgText = await loadSvgText(code, forceDownload);

		const parsed = new JSDOM(svgText);
		const svg = parsed.window?.document?.body.children[0];

		if (!(svg instanceof parsed.window.SVGSVGElement)) {
			throw new TypeError("Could not parse SVG document");
		}

		componentCode += svgToJsx(svg, name);
	}

	const tsxFileName = path.resolve(__dirname, "../src/pieces.tsx");

	console.log("Formatting output");
	const prettierConfig = await prettier.resolveConfig(tsxFileName);
	const tsxContent = prettier.format(`${TSX_HEADER}${componentCode}`, {
		...(prettierConfig ?? {}),
		parser: "babel-ts",
	});

	console.log("Writing output to", tsxFileName);
	await fs.writeFile(tsxFileName, tsxContent);

	console.log("Output generated successfully");
}

async function loadSvgText(code: string, forceDownload: boolean) {
	const filePath = path.join(CACHE_DIR, `${code}.svg`);

	return forceDownload || !existsSync(filePath)
		? downloadSvgText(code, filePath)
		: fs.readFile(filePath);
}

const CACHE_DIR = path.resolve(__dirname, "cached-downloads");

async function downloadSvgText(code: string, fileName: string) {
	const htmlUrl = `https://commons.wikimedia.org/wiki/File:Chess_${code}45.svg`;

	const htmlText = await fetchText(htmlUrl);

	const html = new JSDOM(htmlText);
	if (!html) {
		throw new Error("HTML parse error");
	}

	const htmlDoc = html.window.document;

	// Make sure the author and the license have not changed
	const author = (htmlDoc.querySelector(
		"#fileinfotpl_aut+td",
	) as HTMLTableDataCellElement)?.textContent?.trim();
	if (author !== "User:Cburnett" && author !== "en:User:Cburnett") {
		throw new Error(`Unexpected author: ${author}`);
	}

	const license = (htmlDoc.querySelector(
		"#fileinfotpl_perm+td",
	) as HTMLTableDataCellElement).textContent?.trim();
	if (license !== "GFDL & BSD & GPL") {
		throw new Error(`Unexpected license: ${license}`);
	}

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const anchor = htmlDoc.querySelector(
		`a[title="Chess ${code}45.svg"]`,
	) as HTMLAnchorElement | null;
	if (!anchor) {
		console.log(htmlText);
		throw new Error("Could not find link to the SVG file");
	}

	const text = await fetchText(anchor.href);
	await fs.writeFile(fileName, text);

	return text;
}

const RATE_LIMIT_SLEEP_MS = 1000;

async function fetchText(url: string) {
	console.log("Downloading", url);

	let response: FetchResponse;
	for (;;) {
		response = await fetch(url, {
			headers: {
				"User-Agent":
					"chessire-pieces-downloader/1.0 (https://chessire.com/) node-fetch/2.5.8",
			},
		});
		if (response.status !== 429) {
			break;
		}
		console.log(
			"Rate limit exceeded, sleeping for",
			RATE_LIMIT_SLEEP_MS,
			"ms before retrying",
		);
		await sleep(RATE_LIMIT_SLEEP_MS);
	}

	if (!response.ok) {
		throw new Error(
			`Status code returned "${response.status} ${
				response.statusText
			}" while downloading ${url}. Headers: ${JSON.stringify(
				response.headers,
			)}`,
		);
	}

	return response.text();
}

function svgToJsx(svg: SVGSVGElement, name: string) {
	svg.setAttribute("viewBox", "0 0 45 45");
	svg.setAttribute("width", "1em");
	svg.removeAttribute("height");

	const color = name.startsWith("White") ? "white" : "black";
	const header = makeComponentHeader(name, color);
	const body = recursivelyConvertToJsx(svg, color);

	return `${header}${body});\n\n${name}.displayName = "${name}";\n\n`;
}

// Component name and Wikimedia code for each piece
const PIECES = [
	["WhiteKing", "klt"],
	["BlackKing", "kdt"],
	["WhiteQueen", "qlt"],
	["BlackQueen", "qdt"],
	["WhiteRook", "rlt"],
	["BlackRook", "rdt"],
	["WhiteBishop", "blt"],
	["BlackBishop", "bdt"],
	["WhiteKnight", "nlt"],
	["BlackKnight", "ndt"],
	["WhitePawn", "plt"],
	["BlackPawn", "pdt"],
];

const TSX_HEADER = `/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines */
import React, { SVGAttributes, forwardRef } from "react";

interface IndividualPieceProps extends SVGAttributes<SVGSVGElement> {
	fillColor?: string;
	strokeColor?: string;
}

`;

function makeComponentHeader(name: string, color: "black" | "white") {
	return `export const ${name} = forwardRef<SVGSVGElement, IndividualPieceProps>(({ fillColor = "${color}", strokeColor = "${
		color === "white" ? "black" : "white"
	}", ...props }, ref) => `;
}

function recursivelyConvertToJsx(
	element: SVGElement,
	color: "white" | "black",
	root = true,
): string {
	const attributes = Array.from(element.attributes);
	let attrText = "";

	for (const attr of attributes) {
		attrText +=
			attr.name === "style"
				? convertStyleAttribute(attr.value, color)
				: ` ${attr.name}="${attr.textContent}"`;
	}

	if (root) {
		attrText += " {...props} ref={ref}";
	}

	const childrenText = Array.from(element.children)
		.map((child) => recursivelyConvertToJsx(child as SVGElement, color, false))
		.join("");

	return childrenText
		? `<${element.tagName}${attrText}>${childrenText}</${element.tagName}>`
		: `<${element.tagName}${attrText}/>`;
}

function convertStyleAttribute(attrValue: string, color: "black" | "white") {
	const modifiedStyles = attrValue
		.split(";")
		.map((s) => {
			if (!s.trim()) {
				return null;
			}

			let [name, value] = s.split(":").map((x) => x.trim());

			if (!name || !value) {
				throw new Error(`Could not parse style rule ${s}`);
			}

			if (
				(name === "stroke" || name === "fill") &&
				// The # sign is optional because older versions of some files had it missing
				/^#?(0|f){3}(0|f){3}?$/gi.test(value)
			) {
				value = value.endsWith("0")
					? color === "white"
						? "strokeColor"
						: "fillColor"
					: color === "white"
					? "fillColor"
					: "strokeColor";
			} else if (name !== "stroke-miterlimit") {
				value = `"${value}"`;
			}

			if (name.endsWith("opacity")) {
				return null;
			}

			name = toCamelCase(name);

			return `${name}: ${value}`;
		})
		.filter(Boolean)
		.sort()
		.join(",");

	return modifiedStyles ? ` style={{${modifiedStyles}}}` : "";
}

async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function toCamelCase(identifier: string) {
	const [first, ...rest] = identifier.split("-");

	return [first, ...rest.map((s) => s[0].toUpperCase() + s.slice(1))].join("");
}

main().catch((error) => console.error(error));
