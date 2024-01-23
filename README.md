# Rivet Stickers

[Stickers](https://rivet.iu.edu/stickers/) for Indiana University's Rivet Design System.

## Contents

1. [Quick start](#quick-start)
1. [Install](#install)
1. [Usage](#usage)
1. [HTML API](#html-api)
1. [Accessibility](#accessibility)
1. [Request a new sticker](#request-a-new-sticker)
1. [Run the docs site](#run-the-docs-site)

## Quick start

```html
<!doctype html>
<html lang="en">
	<head>
		<title>Rivet sticker example</title>
		<link rel="stylesheet" href="https://unpkg.com/rivet-stickers@1/dist/rivet-sticker-element.css">
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
| `./dist/rivet-stickers.json` | JSON array of all sticker names. |
| `./dist/rivet-sticker-element.js` | Rivet Sticker Element (custom element `<rvt-sticker>`). |
| `./dist/rivet-sticker-element.css` | Rivet Sticker Element styles. |
| `./src/stickers/*.svg` | Sticker source files. |

### `stickers/*.js`

Use the sticker modules for production. This method is recommended, as only the declared stickers will be included. These modules import the Rivet Sticker Element.

```js
import 'rivet-stickers/dist/stickers/tulip.js';
import 'rivet-stickers/dist/stickers/t-shirt-iu.js';
```

### `rivet-stickers.js`

Use the module bundle for development or prototyping. The Rivet Sticker Element and all stickers are included.

```html
<script type="module" src="./rivet-stickers/dist/rivet-stickers.js"></script>
```

### `rivet-sticker-element.css`

Always include this CSS file.

```html
<link rel="stylesheet" href="./rivet-stickers/dist/rivet-sticker-element.css">
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

[Submit a Rivet support request](https://rivet.uits.iu.edu/help/#support-request-form) to request a new sticker.

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
