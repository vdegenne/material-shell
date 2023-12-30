/**
 * @license
 * Copyright (c) 2023 Valentin Degenne
 * SPDX-License-Identifier: MIT
 */
import {render, html} from 'lit-html';

export class MaterialShell extends HTMLElement {
	#loading = true;

	set loading(value: boolean) {
		if (value === true) {
			this.setAttribute('loading', '');
		} else {
			this.removeAttribute('loading');
		}
		this.#loading = value;
		this.render();
	}

	get loading() {
		console.log(this.#loading);
		return this.#loading;
	}

	constructor() {
		super();
		this.attachShadow({mode: 'open'});

		// Styles
		const ss = new CSSStyleSheet();
		ss.replaceSync('[hidden] { display: none !important }');
		this.shadowRoot.adoptedStyleSheets.push(ss);

		// Events
		this.addEventListener('material-loading-on', () => (this.loading = true));
		this.addEventListener('material-loading-off', () => (this.loading = false));
	}

	connectedCallback() {
		this.render();
	}

	render() {
		console.log('render');
		render(
			html`
				<div ?hidden=${this.loading}>
					<slot></slot>
				</div>
				<div
					style="position:absolute;inset:0;display:flex;justify-content:center;align-items:center;"
					?hidden=${!this.loading}
				>
					<md-circular-progress
						?indeterminate=${this.loading}
					></md-circular-progress>
				</div>
			`,
			this.shadowRoot
		);
	}
}

window.customElements.define('material-shell', MaterialShell);
