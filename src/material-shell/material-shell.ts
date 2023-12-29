/**
 * @license
 * Copyright (c) 2023 Valentin Degenne
 * SPDX-License-Identifier: MIT
 */
import { LitElement, css } from 'lit';
import { render, html } from 'lit-html';
import { customElement, state } from 'lit/decorators.js';

@customElement('material-shell')
export class MaterialShell extends HTMLElement {
  _loading;
  set loading(value) {
    if (value) this.setAttribute('loading', '');
    else this.removeAttribute('loading');
    this._loading = value;
    this.render();
  }

  get loading() {
    return this._loading;
  }

  static styles = css`
    [hidden] {
      display: none !important;
    }
  `;

  constructor() {
    super();
    this.addEventListener('material-loading-on', () => (this.loading = true));
    this.addEventListener('material-loading-off', () => (this.loading = false));
    this.attachShadow({ mode: 'open' });
    // @ts-ignore
    this.adoptedStyleSheets = [MaterialShell.styles];
  }

  connectedCallback() {
    this.loading = true;
  }

  render() {
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
