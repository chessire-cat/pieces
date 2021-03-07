import ts from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

/** @type {import('rollup').RollupOptions} */
const options = {
	input: "src/index.tsx",
	output: [
		{
			file: pkg.main,
			format: "cjs",
			plugins: [terser()],
			exports: "named",
		},
		{
			file: pkg.module,
			format: "esm",
			plugins: [terser()],
		},
	],
	external: ["react"],
	plugins: [ts({ transpiler: "babel" })],
};

export default options;
