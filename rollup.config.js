import {nodeResolve} from '@rollup/plugin-node-resolve';
import {cssModules} from 'rollup-plugin-css-modules';
import {minifyTemplateLiterals} from 'rollup-plugin-minify-template-literals';
import terser from '@rollup/plugin-terser';
import CleanCSS from 'clean-css';

/** @type {import('rollup').RollupOptions} */
export default {
	input: 'lib/material-shell/index.js',
	output: {file: './material-shell.js', format: 'iife'},
	plugins: [
		nodeResolve(),
		{
			name: 'clean-css',
			transform(code, id) {
				if (id.endsWith('css')) {
					return new CleanCSS({}).minify(code).styles;
				}
			},
		},
		minifyTemplateLiterals(),
		cssModules(),
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
		terser({
			format: {
				comments: false,
			},
		}),
	],
};
