import {LitElement} from 'lit';

export class MaterialShellChild extends LitElement {
	async connectedCallback() {
		super.connectedCallback();
		if (!this.hasUpdated) {
			await this.updateComplete;
		}
		shell.loading = false;
	}
}
