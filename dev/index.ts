import { render, html } from 'lit-html';
import { customElement } from 'lit/decorators.js';
import { materialShellLoadingOff } from '../lib/index.js';

@customElement('e-l')
class E extends HTMLElement {
  render() {
    return html`hihi`;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    setTimeout(() => {
      render(this.render(), this.shadowRoot);
      materialShellLoadingOff.call(this);
      // OR
      // document.querySelector('material-shell')!.loading = false;
    }, 2000);
  }
}
