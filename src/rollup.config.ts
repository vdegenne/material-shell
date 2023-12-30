import type {Plugin, RollupOptions} from 'rollup';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {cssModules} from 'rollup-plugin-css-modules';
import {minifyTemplateLiterals} from 'rollup-plugin-minify-template-literals';
import {default as _terser} from '@rollup/plugin-terser';
import CleanCSS from 'clean-css';
import copy from 'rollup-plugin-copy';

const terser = () =>
	_terser({
		format: {
			comments: false,
		},
	});

export default [
	/** material-styles */
	{
		input: 'lib/material-styles/index.js',
		output: {file: './material-styles.js', format: 'iife'},
		plugins: [
			copy({
				targets: [
					{
						src: 'src/lib/material-styles/*.css',
						dest: 'lib/material-styles/',
					},
				],
			}),
			cleanCss(),
			cssModules(),
			terser(),
		],
	},
	/** material-shell */

	{
		input: 'lib/material-shell/index.js',
		output: {file: './material-shell.js', format: 'iife'},
		plugins: [
			nodeResolve(),
			cleanCss(),
			minifyTemplateLiterals(),
			{
				name: 'rename-circular-progress-element',
				transform(code, id) {
					if (id.endsWith('material-shell/material-shell.js')) {
						code = code.replace(
							/<md-circular-progress /,
							'<md-circular-progress0 '
						);
						code = code.replace(
							/<\/md-circular-progress/,
							'</md-circular-progress0'
						);
						return code;
					}
					if (id.endsWith('progress/circular-progress.js')) {
						return code.replace(
							/customElement\('md-circular-progress'\)/,
							"customElement('md-circular-progress0')"
						);
					}
				},
			},
			terser(),
		],
	},
] as RollupOptions[];

function cleanCss(): Plugin {
	return {
		name: 'clean-css',
		transform(code, id) {
			if (id.endsWith('css')) {
				return new CleanCSS({}).minify(code).styles;
			}
		},
	};
}
