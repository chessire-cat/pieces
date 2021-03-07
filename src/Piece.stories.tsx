import { Meta, Story } from "@storybook/react";
import React from "react";
import { Piece, PieceProps } from ".";

const meta: Meta = {
	title: "Piece",
	component: Piece,
	argTypes: {
		color: { description: "Piece color" },
		piece: { description: "Piece type" },
		width: {
			table: {
				type: {
					summary: "string | number",
				},
				defaultValue: { summary: `"1em"` },
			},
			control: {
				type: "range",
				min: "16",
				max: "256",
			},
			description:
				"Width of the piece. The height is the same as the width unless overridden specifically.",
		},
		fillColor: {
			control: "color",
			description: "Fill color",
			table: {
				defaultValue: {
					summary: `"white" for white pieces "black" for black pieces`,
				},
			},
		},
		strokeColor: {
			control: "color",
			description: "Stroke color",
			table: {
				defaultValue: {
					summary: `"black" for white pieces "white" for black pieces`,
				},
			},
		},
	},
};

export default meta;

const Template: Story<PieceProps> = (args) => <Piece {...args} />;

export const WhiteKingStory = Template.bind({});
WhiteKingStory.args = { color: "white", piece: "K", width: 64 };
WhiteKingStory.storyName = "White king";

export const BlackKingStory = Template.bind({});
BlackKingStory.args = { color: "black", piece: "K", width: 64 };
BlackKingStory.storyName = "Black king";

export const WhiteQueenStory = Template.bind({});
WhiteQueenStory.args = { color: "white", piece: "Q", width: 64 };
WhiteQueenStory.storyName = "White queen";

export const BlackQueenStory = Template.bind({});
BlackQueenStory.args = { color: "black", piece: "Q", width: 64 };
BlackQueenStory.storyName = "Black queen";

export const WhiteRookStory = Template.bind({});
WhiteRookStory.args = { color: "white", piece: "R", width: 64 };
WhiteRookStory.storyName = "White rook";

export const BlackRookStory = Template.bind({});
BlackRookStory.args = { color: "black", piece: "R", width: 64 };
BlackRookStory.storyName = "Black rook";

export const WhiteBishopStory = Template.bind({});
WhiteBishopStory.args = { color: "white", piece: "B", width: 64 };
WhiteBishopStory.storyName = "White bishop";

export const BlackBishopStory = Template.bind({});
BlackBishopStory.args = { color: "black", piece: "B", width: 64 };
BlackBishopStory.storyName = "Black bishop";

export const WhiteKnightStory = Template.bind({});
WhiteKnightStory.args = { color: "white", piece: "N", width: 64 };
WhiteKnightStory.storyName = "White knight";

export const BlackKnightStory = Template.bind({});
BlackKnightStory.args = { color: "black", piece: "N", width: 64 };
BlackKnightStory.storyName = "Black knight";

export const WhitePawnStory = Template.bind({});
WhitePawnStory.args = { color: "white", piece: "P", width: 64 };
WhitePawnStory.storyName = "White pawn";

export const BlackPawnStory = Template.bind({});
BlackPawnStory.args = { color: "black", piece: "P", width: 64 };
BlackPawnStory.storyName = "Black pawn";

export const CustomColorsStory = Template.bind({});
CustomColorsStory.args = {
	color: "black",
	piece: "N",
	width: 64,
	fillColor: "brown",
	strokeColor: "lightpink",
};
CustomColorsStory.storyName = "Custom colors";
