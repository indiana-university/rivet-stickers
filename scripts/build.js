/*!
 * Copyright (C) 2024 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { build } from 'vite';

const BUNDLE_BASE_NAME = 'rivet-stickers';
const ELEMENT_BASE_NAME = 'rivet-sticker-element';
const OUT_DIR = 'dist';
const SRC_DIR = 'src';

//
// Start build process
//

await cleanup();
const stickers = await getStickers();
await createJSON(stickers);
await createCustomElement();
await createJS(stickers);
await createBundle(stickers);

//
// Build steps
//

async function cleanup () {
	await fs.rm(OUT_DIR, { force: true, recursive: true });
	await fs.mkdir(OUT_DIR, { recursive: true });
}

async function getStickers () {
	const dir = path.join(SRC_DIR, 'stickers');
	const promises = (await fs.readdir(dir))
		.map((file) => {
			const filePath = path.resolve(dir, file);
			const { ext, name } = path.parse(file);
			return { ext, filePath, name };
		})
		.filter(({ ext }) => ext === '.svg')
		.sort(sortByKey('name'))
		.map(async ({ filePath, name }) => {
			const source = await fs.readFile(filePath, { encoding: 'utf8' });
			return { name, source };
		});
	return await Promise.all(promises);
}

async function createJSON (stickers) {
	const data = stickers.map(({ name }) => name);
	const contents = JSON.stringify(data);
	await writeFile(`${BUNDLE_BASE_NAME}.json`, contents);
}

async function createCustomElement () {
	await build({
		build: {
			emptyOutDir: false,
			lib: {
				entry: `${SRC_DIR}/${ELEMENT_BASE_NAME}.js`,
				fileName: ELEMENT_BASE_NAME,
				formats: ['es']
			},
			rollupOptions: {
				output: {
					assetFileNames: `${ELEMENT_BASE_NAME}.[ext]`
				}
			}
		}
	});
}

async function createJS (stickers) {
	const promises = stickers.map(async ({ name, source }) => {
		const svg = source
			.replace(/(<svg).*(>)/, '$1$2')
			.replace(/(fill=")#fff(")/g, '$1var(--fill)$2')
			.replace(/ fill="#000"/g, '')
			.replace(/(\n|  )/g, '');
		const contents =
`import { registerSticker } from './${ELEMENT_BASE_NAME}.js';

const name = '${name}';
const svg = \`${svg}\`;

registerSticker(name, svg);
`;
		await writeFile(`${name}.js`, contents);
	});
	await Promise.all(promises);
}

async function createBundle (stickers) {
	const tmpFile = 'tmp.js';
	const tmpPath = path.resolve(OUT_DIR, tmpFile);
	const contents = stickers
		.map(({ name }) => `import './${name}.js';\n`)
		.join('');
	await writeFile(tmpFile, contents);
	await build({
		build: {
			emptyOutDir: false,
			lib: {
				entry: tmpPath,
				fileName: BUNDLE_BASE_NAME,
				formats: ['es']
			},
			rollupOptions: {
				external: [`./${ELEMENT_BASE_NAME}.js`]
			}
		}
	});
	await fs.rm(tmpPath);
}

//
// Utilities
//

function hasKey (source, key) {
	return Object.prototype.hasOwnProperty.call(source, key);
}

function sortByKey (key) {
	return (a, b) => {
		if (!hasKey(a, key) || !hasKey(b, key)) {
			return 0;
		}
		return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
	};
}

async function writeFile (fileName, contents) {
	return fs.writeFile(path.resolve(OUT_DIR, fileName), contents);
}
