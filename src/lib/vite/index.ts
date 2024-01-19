import {type Plugin} from 'vite';
import {readFile} from 'node:fs/promises';

export function materialShell(): Plugin {
	return {
		name: 'material-shell',

		async transformIndexHtml(html: string) {
			return [
				{
					injectTo: 'head-prepend',
					tag: 'script',
					children: (
						await readFile('node_modules/material-shell/material-styles.js')
					).toString(),
				},
				{
					injectTo: 'head-prepend',
					tag: 'script',
					children: (
						await readFile('node_modules/material-shell/material-shell.js')
					).toString(),
				},
			];

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
