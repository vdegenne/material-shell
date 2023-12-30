import {LitElement} from 'lit';
import {html} from 'lit-html';
import {materialShellLoadingOff} from '../lib/index.js';

class E extends LitElement {
	render() {
		return html`hihi`;
	}

	firstUpdated() {
		setTimeout(() => {
			materialShellLoadingOff.call(this);
			// OR
			// document.querySelector('material-shell')!.loading = false;
		}, 2000);
	}
}
window.customElements.define('e-l', E);
