/**
 * @license
 * Copyright (c) 2023 Valentin Degenne
 * SPDX-License-Identifier: MIT
 */
import materialDefault from './material.css' assert {type: 'css'};
import globalStyles from './globals.css' assert {type: 'css'};

let materialSheet: CSSStyleSheet;
const savedTheme = localStorage.getItem('material-theme');
if (savedTheme) {
	materialSheet = new CSSStyleSheet();
	materialSheet.replaceSync(savedTheme);
} else {
	// Default Material Theme
	materialSheet = materialDefault;
}
document.adoptedStyleSheets.push(materialSheet);
(window as {} as {[prop: string]: CSSStyleSheet})['material-theme'] =
	materialSheet;

// Global styles
document.adoptedStyleSheets.push(globalStyles);
