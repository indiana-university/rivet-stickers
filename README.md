# Rivet Stickers

[Stickers](https://rivet.iu.edu/stickers/) for Indiana University's Rivet Design System.

## Contents

1. [Quick start](#quick-start)
1. [Install](#install)
1. [Usage](#usage)
1. [HTML API](#html-api)
1. [JavaScript API](#javascript-api)
1. [Accessibility](#accessibility)
1. [Flash of unstyled content](#flash-of-unstyled-content)
1. [Request a new sticker](#request-a-new-sticker)
1. [Run the docs site](#run-the-docs-site)

## Quick start

```html
<!doctype html>
<html lang="en">
	<head>
		<title>Rivet sticker example</title>
		<script type="module" src="https://unpkg.com/rivet-stickers@1/dist/rivet-stickers.js"></script>
	</head>
	<body>
		<rvt-sticker name="tulip"></rvt-sticker>
	</body>
</html>
```

## Install

Install this package by referencing it from a service like [UNPKG](https://unpkg.com/browse/rivet-stickers/) or from a local installation with npm.

```
npm install --save rivet-stickers
```

## Usage

The following are some notable contents in the `rivet-stickers` npm package and how to use them.

| Path | Description |
| --- | --- |
| `./dist/stickers/*.js` | Sticker modules. |
| `./dist/rivet-stickers.js` | Bundle containing all the stickers (as ES module). |
| `./dist/rivet-stickers.umd.cjs` | Bundle containing all the stickers (as UMD file). |
| `./dist/rivet-stickers.json` | JSON array of all sticker names. |
| `./src/rivet-sticker-element.js` | Rivet Sticker Element (custom element `<rvt-sticker>`). |
| `./src/stickers/*.svg` | Sticker source files. |

### `stickers/*.js`

Use the sticker modules for production. This method is recommended, as only the declared stickers will be included.

```js
import 'rivet-stickers/dist/stickers/tulip.js';
import 'rivet-stickers/dist/stickers/t-shirt-iu.js';
```

### `rivet-stickers.js`

Use the module bundle for development or prototyping. All stickers are included.

```html
<script type="module" src="./rivet-stickers/dist/rivet-stickers.js"></script>
```

### `rivet-stickers.umd.cjs`

Use the UMD bundle for development or prototyping. All stickers are included.

```html
<script src="./rivet-stickers/dist/rivet-stickers.umd.cjs"></script>
```

## HTML API

### `name` attribute

Use the `name` attribute to declare the sticker to be rendered. The name of a sticker matches its corresponding SVG file name (`./src/stickers/*.svg`).

```html
<rvt-sticker name="tulip"></rvt-sticker>
<rvt-sticker name="t-shirt-iu"></rvt-sticker>
```

### `size` attribute

Use the `size` attribute to select the size of the sticker. 

```html
<rvt-sticker name="tulip" size="lg"></rvt-sticker>
```

Size options:

- `xs` (`48px` square)
- `sm` (`64px` square)
- `md` (`80px` square, default)
- `lg` (`96px` square)
- `xl` (`128px` square)

### `theme` attribute

Use the `theme` attribute to select a color theme. Sticker shapes are filled with white, outlined in a dark color, and centered on a circular background with a complementary light color.

```html
<rvt-sticker name="tulip" theme="crimson"></rvt-sticker>
```

Theme options:

- `black` (default)
- `blue`
- `crimson`
- `gold`
- `green`
- `orange`
- `purple`

## JavaScript API

Access the JavaScript API through the `rivet-stickers` module or `RivetStickers` global variable.

```js
// Option 1: If using `stickers/*.js`.
import { getStickers, RivetStickerElement } from 'rivet-stickers';

// Option 2: If using `rivet-stickers.js`.
import { getStickers, RivetStickerElement } from './rivet-stickers/dist/rivet-stickers.js';

// Option 3: If using `rivet-stickers.umd.cjs`.
const { getStickers, RivetStickerElement } = window.RivetStickers;
```

### `rvtStickerRegistered` event

Listen to the custom `rvtStickerRegistered` event to know when each sticker has been registered and is ready to be displayed. In the following example, the names of the stickers ("tulip" and "t-shirt-iu") are logged to the console after each sticker is processed.

```js
document.addEventListener('rvtStickerRegistered', (event) => {
	console.log(event.detail.name);
	// "tulip"
	// "t-shirt-iu"
});
```

### `getStickers()` function

Use the `getStickers()` function get an array of all registered stickers.

```js
import { getStickers } from 'rivet-stickers';

console.log(getStickers());
// ["tulip", "t-shirt-iu"]
```

### `RivetStickerElement` class

Access the `RivetStickerElement` class if you need to extend the class or use JavaScript to instantiate an instance of the element.

[Needs example]

## Accessibility

Stickers are considered decorative images. They are hidden from screen readers via `<svg aria-hidden="true">`. However, [text alternatives should still be provided](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content) wherever stickers are used.

```html
<!-- Example: Text alternative. -->
<rvt-sticker name="t-shirt-iu"></rvt-sticker>
<span>Apparel</span>

<!-- Example: Screen reader only text alternative. -->
<rvt-sticker name="t-shirt-iu"></rvt-sticker>
<span class="rvt-sr-only">Apparel</span>
```

## Flash of unstyled content

"Flash of unstyled content" typically happens when the server (instead of client) renders a custom element (`<rvt-sticker>`). After the element is defined, it becomes visible and shifts the layout. To avoid this, wait to render content until after the element is defined.

In the following example, the HTML document renders nothing until `<rvt-sticker>` is defined.

```css
html:has(rvt-sticker:not(:defined)) {
	display: none;
}
```

## Request a new sticker

[Submit a Rivet support request](https://github.com/indiana-university/rivet-stickers/issues/new) to request a new sticker.

## Run the docs site

To run the docs site locally, clone or download this repo.

Install dependencies.

```
npm install
```

Build the site and start a local development server.

```
npm run start
```
