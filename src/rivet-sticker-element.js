const packageName = 'Rivet Stickers';
const elementName = 'rvt-sticker';
const nameAttributeName = 'name';
const registeredEventName = 'rvtStickerRegistered';
const size = 80;
const nameToTemplateMap = new Map();

const elementTemplate = document.createElement('template');
elementTemplate.innerHTML = `
<style>
:host {
	--color-black-100: #e2e7e9;
	--color-black-500: #243142;
	--color-blue-100: #c6ecf6;
	--color-blue-500: #006298;
	--color-crimson-100: #ffcdc0;
	--color-crimson-500: #900;
	--color-gold-100: #fff4c6;
	--color-gold-600: #a36b00;
	--color-green-100: #dee8c6;
	--color-green-500: #056e41;
	--color-orange-100: #ffcdc0;
	--color-orange-500: #df3603;
	--color-purple-100: #decadc;
	--color-purple-500: #59264d;
	--color-white: #fff;
	--bg: var(--color-black-100);
	--fill: var(--color-white);
	--size-xs: 3rem;
	--size-sm: 4rem;
	--size-md: 5rem;
	--size-lg: 6rem;
	--size-xl: 8rem;
	--size: var(--size-md);
	color: var(--color-black-500);
}
:host([theme="blue"]) {
	--bg: var(--color-blue-100);
	color: var(--color-blue-500);
}
:host([theme="crimson"]) {
	--bg: var(--color-crimson-100);
	color: var(--color-crimson-500);
}
:host([theme="gold"]) {
	--bg: var(--color-gold-100);
	color: var(--color-gold-600);
}
:host([theme="green"]) {
	--bg: var(--color-green-100);
	color: var(--color-green-500);
}
:host([theme="orange"]) {
	--bg: var(--color-orange-100);
	color: var(--color-orange-500);
}
:host([theme="purple"]) {
	--bg: var(--color-purple-100);
	color: var(--color-purple-500);
}
:host([size="xs"]) {
	--size: var(--size-xs);
}
:host([size="sm"]) {
	--size: var(--size-sm);
}
:host([size="md"]) {
	--size: var(--size-md);
}
:host([size="lg"]) {
	--size: var(--size-lg);
}
:host([size="xl"]) {
	--size: var(--size-xl);
}
.container {
	background-color: var(--bg);
	border-radius: 100%;
}
:host,
.container {
	display: inline-flex;
}
svg {
	height: var(--size);
	width: var(--size);
}
</style>
<span class="container"></span>
`;

export function getStickers () {
	return [...nameToTemplateMap.keys()];
}

export function registerSticker (name, content) {
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
		height: size,
		viewBox: `0 0 ${size} ${size}`,
		width: size,
		xmlns: 'http://www.w3.org/2000/svg'
	});
	nameToTemplateMap.set(name, template);
	const event = new CustomEvent(registeredEventName, {
		detail: { name }
	});
	document.dispatchEvent(event);
}

export class RivetStickerElement extends window.HTMLElement {
	#container;
	#name;
	#requestUpdate;

	static get observedAttributes () {
		return [nameAttributeName];
	}

	constructor () {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(elementTemplate.content.cloneNode(true));
		this.#container = shadowRoot.querySelector('.container');
		this.#requestUpdate = throttleRAF(this.#update.bind(this));
	}

	connectedCallback () {
		document.addEventListener(registeredEventName, this.#requestUpdate);
		this.#requestUpdate();
	}

	disconnectedCallback () {
		document.removeEventListener(registeredEventName, this.#requestUpdate);
	}

	attributeChangedCallback () {
		this.#requestUpdate();
	}

	#update () {
		const name = this.getAttribute(nameAttributeName);
		if (!this.#container || !nameToTemplateMap.has(name) || this.#name === name) {
			return;
		}
		const svg = nameToTemplateMap.get(name).content.cloneNode(true);
		this.#container.replaceChildren(svg);
		this.#name = name;
	}
}

window.customElements.define(elementName, RivetStickerElement);

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
