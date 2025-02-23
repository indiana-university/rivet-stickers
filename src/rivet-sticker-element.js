/*!
 * Copyright (C) 2024 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import './rivet-sticker-element.css';

const packageName = 'Rivet Stickers';
const elementName = 'rvt-sticker';
const nameAttributeName = 'name';
const registeredEventName = 'rvtStickerRegistered';
const size = 80;
const nameToTemplateMap = new Map();

export function registerSticker (name, content) {
	window.customElements.get(elementName).register?.(name, content);
}

class RivetStickerElement extends window.HTMLElement {
	#name;
	#requestUpdate = throttleRAF(this.#update.bind(this));

	static get observedAttributes () {
		return [nameAttributeName];
	}

	static register (name, content) {
		if (!name || typeof name !== 'string') {
			throw new Error(`${packageName}: Name must be a string.`);
		}
		const template = document.createElement('template');
		template.innerHTML = content;
		if (template.content.children.length !== 1) {
			throw new Error(`${packageName} (${name}): Content must contain one SVG element.`);
		}
		const svg = template.content.firstChild;
		if (svg.nodeName.toLowerCase() !== 'svg') {
			throw new Error(`${packageName} (${name}): Content must be a SVG element.`);
		}
		setDefaultAttributes(svg, {
			'aria-hidden': 'true',
			fill: 'currentColor',
			focusable: 'false',
			height: '100%',
			viewBox: `0 0 ${size} ${size}`,
			width: '100%',
			xmlns: 'http://www.w3.org/2000/svg'
		});
		nameToTemplateMap.set(name, template);
		const event = new CustomEvent(registeredEventName, {
			detail: { name }
		});
		document.dispatchEvent(event);
	}

	attributeChangedCallback () {
		this.#requestUpdate();
	}

	connectedCallback () {
		document.addEventListener(registeredEventName, this.#requestUpdate);
		this.#requestUpdate();
	}

	disconnectedCallback () {
		document.removeEventListener(registeredEventName, this.#requestUpdate);
	}

	#update () {
		const name = this.getAttribute(nameAttributeName);
		if (!nameToTemplateMap.has(name) || this.#name === name) {
			return;
		}
		const content = nameToTemplateMap.get(name).content.cloneNode(true);
		this.replaceChildren(content);
		this.#name = name;
	}
}

if (!window.customElements.get(elementName)) {
	window.customElements.define(elementName, RivetStickerElement);
}

//
// Utilities
//

function setDefaultAttribute (element, name, value) {
	if (!element.hasAttribute(name)) {
		element.setAttribute(name, value);
	}
}

function setDefaultAttributes (element, attributes) {
	Object.entries(attributes).forEach(([name, value]) => {
		setDefaultAttribute(element, name, value);
	});
}

// Call the function at most once per animation frame.
function throttleRAF (fn) {
	let wait = false;
	return function (...args) {
		if (wait) {
			return;
		}
		wait = true;
		window.requestAnimationFrame(() => {
			fn.call(this, ...args);
			wait = false;
		});
	};
}
