# Rivet Stickers

[Stickers](https://rivet.iu.edu/icons-stickers/) for Indiana University's Rivet Design System.

## Contents

1. [Usage](#usage)
1. [HTML API](#html-api)
1. [Request a new sticker](#request-a-new-sticker)

## Usage

### Development

Link to the Rivet Sticker Element styles and the bundle containing all the stickers in the set in the page. These files can be referenced from a service like [UNPKG](https://unpkg.com/browse/rivet-stickers/). This approach includes all stickers instead of selective ones. As such, this approach is recommended for development, prototyping, or restrictive production environments.

```html
<!doctype html>
<html lang="en">
	<head>
		<link rel="stylesheet" href="https://unpkg.com/rivet-stickers/dist/rivet-sticker-element.css">
		<script type="module" src="https://unpkg.com/rivet-stickers/dist/rivet-stickers.js"></script>
	</head>
	<body>
		<rvt-sticker name="tulip"></rvt-sticker>
	</body>
</html>
```

### Production

For production, first install the npm package.

```
npm install --save rivet-stickers
```

Create a custom module which imports only the stickers needed. The sticker module name (such as `./dist/tulip.js`) matches its corresponding SVG file name (such as `./src/stickers/tulip.svg`).

```js
// ./src/stickers.js
import 'rivet-stickers/dist/tulip.js';
import 'rivet-stickers/dist/t-shirt-iu.js';
```

Link to the Rivet Sticker Element styles and the custom module in the page.

```html
<!doctype html>
<html lang="en">
	<head>
		<link rel="stylesheet" href="./node_modules/rivet-stickers/dist/rivet-sticker-element.css">
		<script type="module" src="./src/stickers.js"></script>
	</head>
	<body>
		<rvt-sticker name="tulip"></rvt-sticker>
		<rvt-sticker name="t-shirt-iu"></rvt-sticker>
	</body>
</html>
```

## Accessibility

By default, stickers are considered decorative images and hidden from screen reader users.

Ask this question to test if alternative text is needed: "Would this content still make sense to sighted users if the sticker was removed?" If no, then add alternative text using the Rivet class `rvt-sr-only`. For example:

```html
<rvt-sticker name="t-shirt-iu"></rvt-sticker>
<span class="rvt-sr-only">T-shirt printed with Indiana University logo</span>
```

### Testing

Download or clone this repo, then install dependencies.

```
npm install
```

Start the server to launch the local test environment.

```
npm run start
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

## Request a new sticker

[Submit a Rivet support request](https://rivet.uits.iu.edu/help/#support-request-form) to request a new sticker.
