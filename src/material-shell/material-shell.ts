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

  constructor() {
    super();
    this.addEventListener('material-loading-on', () => (this.loading = true));
    this.addEventListener('material-loading-off', () => (this.loading = false));
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.loading = true;
  }

  render() {
    render(
      html`
        <style>
          [hidden] {
            display: none !important;
          }
          .loader {
            width: 50px;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 8px solid #0000;
            border-right-color: #ffa50097;
            position: relative;
            animation: l24 1s infinite linear;
          }
          .loader:before,
          .loader:after {
            content: '';
            position: absolute;
            inset: -8px;
            border-radius: 50%;
            border: inherit;
            animation: inherit;
            animation-duration: 2s;
          }
          .loader:after {
            animation-duration: 4s;
          }
          @keyframes l24 {
            100% {
              transform: rotate(1turn);
            }
          }
        </style>
        <div ?hidden=${this.loading}>
          <slot></slot>
        </div>
        <div
          style="position:absolute;inset:0;display:flex;justify-content:center;align-items:center;"
          ?hidden=${!this.loading}
        >
          <div class="loader"></div>
        </div>
      `,
      this.shadowRoot
    );
  }
}
