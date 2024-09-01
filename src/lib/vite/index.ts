import {type HtmlTagDescriptor, type Plugin} from 'vite';
import {readFile} from 'node:fs/promises';
import CleanCSS from 'clean-css';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Options {
	inlineStyles: boolean;
	inlineShellElement: boolean;
	/**
	 * A path to a css file containing material tokens
	 * of the default styles to load.
	 * The file content will be loaded, css minified and prepended in the header
	 * in the form of a script that will inject them in the local storage for the
	 * style script to load them instead of the defaults.
	 * Setting this value will automatically turn `inlineStyles` option to true and
	 * can't be reversed.
	 */
	pathToDefaultMaterialStyleSheet: string;
}

export async function materialShell(
	options: Partial<Options> = {}
): Promise<Plugin> {
	options.inlineStyles ??= true;
	options.inlineShellElement ??= true;

	const tags: HtmlTagDescriptor[] = [];

	if (options.pathToDefaultMaterialStyleSheet) {
		options.inlineStyles = true;
		const inline = new CleanCSS().minify(
			await readFile('src/styles/stylesheets/material.css')
		).styles;
		tags.push({
			tag: 'script',
			children: `if (!localStorage.getItem('material-theme')) { localStorage.setItem('material-theme', '${inline}'); }`,
		});
	}
	if (options.inlineStyles) {
		tags.push({
			tag: 'script',
			children: (
				await readFile(`${__dirname}/../../material-styles.js`)
			).toString(),
		});
	}
	if (options.inlineShellElement) {
		tags.push({
			tag: 'script',
			children: (
				await readFile(`${__dirname}/../../material-shell.js`)
			).toString(),
		});
	}

	return {
		name: 'material-shell',

		async transformIndexHtml() {
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
