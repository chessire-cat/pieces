import React, { SVGAttributes, forwardRef } from "react";
import {
	BlackBishop,
	BlackKing,
	BlackKnight,
	BlackPawn,
	BlackQueen,
	BlackRook,
	WhiteBishop,
	WhiteKing,
	WhiteKnight,
	WhitePawn,
	WhiteQueen,
	WhiteRook,
} from "./pieces";

export interface PieceProps extends SVGAttributes<SVGSVGElement> {
	/** Piece color */
	color: "white" | "black";
	/** Piece type */
	piece: "K" | "Q" | "R" | "B" | "N" | "P";
	/** Fill color. Defaults to "white" for white pieces and "black" for black pieces. */
	fillColor?: string;
	/** Contour color. Defaults to "black" for white pieces and "white" for black pieces. */
	strokeColor?: string;
}

/** A chess piece. All remaining properties (notably ref, width and height) are forwarded to the SVG element.  */
export const Piece = forwardRef<SVGSVGElement, PieceProps>(
	({ color, piece, ...props }, ref) => {
		const PieceComponent = PIECE_MAP[color][piece];

		return <PieceComponent {...props} ref={ref} />;
	},
);

Piece.displayName = "Piece";

const PIECE_MAP = {
	white: {
		K: WhiteKing,
		Q: WhiteQueen,
		R: WhiteRook,
		B: WhiteBishop,
		N: WhiteKnight,
		P: WhitePawn,
	},
	black: {
		K: BlackKing,
		Q: BlackQueen,
		R: BlackRook,
		B: BlackBishop,
		N: BlackKnight,
		P: BlackPawn,
	},
};

export default Piece;
