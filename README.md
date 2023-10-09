# Rivet Stickers

[Stickers](https://rivet.iu.edu/stickers/) for Indiana University's Rivet Design System.

## Contents

1. [Quick start](#quick-start)
1. [Install](#install)
1. [API](#api)
1. [Usage](#usage)
1. [Change sticker color](#change-sticker-color)
1. [Change sticker spacing](#change-sticker-spacing)
1. [Flash of unstyled content](#flash-of-unstyled-content)
1. [Accessibility](#accessibility)
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

Link to the desired JavaScript modules inside of the HTML document's `<head>`. In the following example, replace "`/path/to/`" with the appropriate path to the modules.

```html
<!-- Option 1: Include all stickers in a single bundled file. -->
<script type="module" src="/path/to/rivet-stickers/dist/rivet-stickers.js"></script>

<!-- Option 2 (recommended): Make a custom sticker set. -->
<script type="module" src="/src/stickers.js"></script>
```

The `rivet-stickers.js` file is ideal for prototyping (Option 1), but it likely includes more stickers than are needed for production. Instead, it is recommended to make a custom sticker set in a JavaScript module (Option 2).

```js
// Option 2: /src/stickers.js
import 'rivet-stickers/dist/stickers/popper.js';
import 'rivet-stickers/dist/stickers/tulip.js';
```

## API

The following are some notable contents in the `rivet-stickers` npm package and how to use them.

| Path | Description |
| --- | --- |
| `./dist` | Production JavaScript modules. |
| `./dist/stickers/*.js` | sticker modules. |
| `./dist/rivet-stickers.js` | Bundle containing all the stickers (as ES module). |
| `./dist/rivet-stickers.umd.cjs` | Bundle containing all the stickers (as UMD file). |
| `./dist/rivet-stickers.json` | JSON array of all sticker names. |
| `./src` | Source files. |
| `./src/rivet-sticker-element.js` | Rivet Sticker Element (custom element `<rvt-sticker>`). |
| `./src/stickers/*.svg` | SVG sticker files. |

### `stickers/*.js`

Use the sticker modules for production.

```js
// Import individual sticker modules.
import 'rivet-stickers/dist/stickers/tulip.js';
import 'rivet-stickers/dist/stickers/t-shirt-iu.js';

// Optional: Access the API.
import { getStickers, RivetStickerElement } from 'rivet-stickers';
```

### `rivet-stickers.js`

Use the module bundle for development or prototyping.

```js
// Import all stickers from a single module.
import 'rivet-stickers/dist/rivet-stickers.js';

// Optional: Access the API.
import { getStickers, RivetStickerElement } from 'rivet-stickers/dist/rivet-stickers.js';
```

### `rivet-stickers.umd.cjs`

Use the UMD bundle for development or prototyping.

```html
<!-- Import all stickers from a single file. -->
<script src="/path/to/rivet-stickers/dist/rivet-stickers.umd.cjs"></script>
<script>
// Optional: Access the API.
const { getStickers, RivetStickerElement } = window.Rivetstickers;
</script>
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

## Usage

Once stickers are installed and registered, they can be rendered in HTML.

```html
<rvt-sticker name="tulip"></rvt-sticker>
<rvt-sticker name="t-shirt-iu"></rvt-sticker>
```

## Color themes

Use the `theme` attribute to color stickers.

```html
<!-- Default theme: Black lines on transparent background. -->
<!-- Ignore the "theme" attribute to apply the "default" theme. -->
<rvt-sticker name="tulip"></rvt-sticker>

<!-- Neutral theme: Black lines on light gray circular background. -->
<rvt-sticker name="tulip" theme="neutral"></rvt-sticker>

<!-- Crimson theme: Red lines on light red circular background. -->
<rvt-sticker nae="tulip" theme="crimson"></rvt-sticker>
```

## Flash of unstyled content

"Flash of unstyled content" typically happens when the server (instead of client) renders a custom element (`<rvt-sticker>`). After the element is defined, it becomes visible and shifts the layout. To avoid this, wait to render content until after the element is defined.

In the following example, the HTML document renders nothing until `<rvt-sticker>` is defined.

```css
html:has(rvt-sticker:not(:defined)) {
	display: none;
}
```

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
