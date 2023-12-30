import {materialShellLoadingOff} from '../lib/index.js';

window.customElements.define(
	'e-l',
	class extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({mode: 'open'});
			this.render();
		}

		render() {
			this.shadowRoot.innerHTML = 'hihi';
		}

		connectedCallback() {
			setTimeout(() => {
				materialShellLoadingOff.call(this);
				// OR
				// document.querySelector('material-shell')!.loading = false;
			}, 5000);
		}
	}
);
