/**
 * @license
 * Copyright (c) 2023 Valentin Degenne
 * SPDX-License-Identifier: MIT
 */
import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('material-shell')
export class MaterialShell extends LitElement {
	@state() loading = true;

	static styles = css`
		[hidden] {
			display: none !important;
		}
	`;

	constructor() {
		super();
		this.addEventListener('material-loading-on', () => (this.loading = true));
		this.addEventListener('material-loading-off', () => (this.loading = false));
	}

	render() {
		return html`
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
		`;
	}
}
