import {type HtmlTagDescriptor, type Plugin} from 'vite';
import {readFile} from 'node:fs/promises';

interface Options {
	inlineStyles: boolean;
	inlineShellElement: boolean;
}

export function materialShell(options: Partial<Options> = {}): Plugin {
	options.inlineStyles ??= true;
	options.inlineShellElement ??= true;

	return {
		name: 'material-shell',

		async transformIndexHtml() {
			const tags: HtmlTagDescriptor[] = [];
			if (options.inlineStyles) {
				tags.push({
					injectTo: 'head-prepend',
					tag: 'script',
					children: (
						await readFile('node_modules/material-shell/material-styles.js')
					).toString(),
				});
			}
			if (options.inlineShellElement) {
				tags.push({
					injectTo: 'head-prepend',
					tag: 'script',
					children: (
						await readFile('node_modules/material-shell/material-shell.js')
					).toString(),
				});
			}

			return tags;
			// Material styles
			// html = html.replace(
			// 	'<material-styles />',
			// 	`<script>${await readFile(
			// 		'node_modules/material-shell/material-styles.js'
			// 	)}</script>`
			// );
			// // Material shell
			// html = html.replace(
			// 	'<material-shell />',
			// 	`<script>${await readFile(
			// 		'node_modules/material-shell/material-shell.js'
			// 	)}</script>`
			// );

			// return html;
		},
	};
}
