import {type MaterialShell} from './material-shell/material-shell.js';

const bubbles = true;
const composed = true;

export function materialShellLoadingOn(this: HTMLElement) {
	this.dispatchEvent(new Event('material-loading-on', {bubbles, composed}));
}

export function materialShellLoadingOff(this: HTMLElement) {
	this.dispatchEvent(new Event('material-loading-off', {bubbles, composed}));
}

declare global {
	interface HTMLElementTagNameMap {
		'material-shell': MaterialShell;
	}
	interface HTMLElementEventMap {
		'material-loading-on': Event;
		'material-loading-off': Event;
	}
}
