import {LitElement} from 'lit';
import {html} from 'lit-html';
import {materialShellLoadingOff} from '../lib/index.js';

class E extends LitElement {
	render() {
		console.log('rendered');
		return html`hihi`;
	}

	firstUpdated() {
		setTimeout(() => {
			materialShellLoadingOff.call(this);
			// OR
			// document.querySelector('material-shell')!.loading = false;
		}, 5000);
	}
}
window.customElements.define('e-l', E);
