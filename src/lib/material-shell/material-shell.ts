/**
 * @license
 * Copyright (c) 2023 Valentin Degenne
 * SPDX-License-Identifier: MIT
 */
// import {render, html} from 'lit-html';
// import styles from './material-shell.css' with {type: 'css'};

export class MaterialShell extends HTMLElement {
	#loading = true;

	set loading(value: boolean) {
		// if (value === true) {
		// 	this.setAttribute('loading', '');
		// } else {
		// 	this.removeAttribute('loading');
		// }
		this.#loading = value;
		this.render();
	}

	get loading() {
		return this.#loading;
	}

	constructor() {
		super();
		this.attachShadow({mode: 'open'});

		// Styles
		// this.shadowRoot.adoptedStyleSheets.push(styles);

		// Events
		this.addEventListener('material-loading-on', () => (this.loading = true));
		this.addEventListener('material-loading-off', () => (this.loading = false));

		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		// render(
		// 	html`
		// 		<div ?hidden=${this.loading}>
		// 			<slot></slot>
		// 		</div>
		// 		<div
		// 			style="position:absolute;inset:0;display:flex;justify-content:center;align-items:center;"
		// 			?hidden=${!this.loading}
		// 		>
		// 			<md-circular-progress
		// 				?indeterminate=${this.loading}
		// 			></md-circular-progress>
		// 		</div>
		// 	`,
		// 	this.shadowRoot
		// );
		this.shadowRoot!.innerHTML = this.loading
			? '<div style="position:absolute;inset:0;display:flex;justify-content:center;align-items:center"><circular-progress0 indeterminate></circular-progress0></div>'
			: '<slot></slot>';
	}
}

window.customElements.define('material-shell', MaterialShell);
