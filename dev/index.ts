import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {materialShellLoadingOff} from '../lib/index.js';

@customElement('e-l')
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
