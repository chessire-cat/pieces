# @chessire/pieces

React chess piece component

***

SVG graphics for the pieces are automatically converted from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces).

## Features
* Consistent and neutral look and feel
* Customizable size and colors
* Compatible with IE11, modern browsers, and Node.js (for server-side rendering).
* Built-in Typescript type definitions
* All SVG attributes and the `ref` prop are forwarded to the `<svg>` element

## Demo

TODO: Add demo

## Installing

```shell
$ npm install @chessire/pieces
```

## Usage

```tsx
import { Piece } from "@chessire/pieces"; // Default import also works

export const BlackKnight = () => <Piece color="black" piece="N" width={64} />;
```

## Properties

```typescript
	// Piece color
	color: "white" | "black";
	// Piece type
	piece: "K" | "Q" | "R" | "B" | "N" | "P";
	// Fill color. Defaults to "white" for white pieces and "black" for black pieces.
	fillColor?: string;
	// Contour color. Defaults to "black" for white pieces and "white" for black pieces.
	strokeColor?: string;
```

All other properties (including, notably, `width`, `height`, and `ref`) are forwarded to the `<svg>` element.

## Contributing

Clone the repo, `npm install`, make your changes, and send a pull request. But please note in advance that I am **not** interested in adding fairy chess pieces as of yet.  `npm run generate` regenerates the graphics in `src/pieces.tsx` but because the script makes a lot of assumptions, the process should not be considered fully automatic. So please make sure to run `npm run storyboard` to visually inspect each piece.

Also please respect the formatting (with prettier) and linting (with eslint) rules. There are git hooks in place to facilitate this.

## Authors or Acknowledgments

* Package creator: Fatih Aygün
* Original creator of the graphics: Colin M.L. Burnett (Wikimedia user [Cburnett](https://en.wikipedia.org/wiki/User:Cburnett)) *(not affiliated with this project)*
* Other Wikimedia editors who made various small contributions. Please check the following links for a full list:
  * https://commons.wikimedia.org/wiki/File:Chess_klt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_kdt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_qlt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_qdt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_rlt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_rdt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_blt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_bdt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_nlt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_ndt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_plt45.svg
  * https://commons.wikimedia.org/wiki/File:Chess_pdt45.svg

## License

This package is licensed under the MIT License.

The original graphics which are available under multiple licenses. They are used under the 3-clause BSD licensein this package. Please see the file ORIGINAL-GRAPHICS-LICENSE.