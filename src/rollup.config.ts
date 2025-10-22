import {config, nodeResolve} from '@vdegenne/rollup'
import type {Plugin} from 'rollup'
import {cssModules} from 'rollup-plugin-css-modules'
import {minifyTemplateLiterals} from 'rollup-plugin-minify-template-literals'
import CleanCSS from 'clean-css'
import {createRequire} from 'node:module'

const require = createRequire(import.meta.url)
const terser = require('@rollup/plugin-terser')

// function terser() {
// 	return _terser({
// 		format: {
// 			comments: false,
// 		},
// 	});
// }

function cleanCss(): Plugin {
	return {
		name: 'clean-css',
		transform(code, id) {
			if (id.endsWith('css')) {
				return new CleanCSS({}).minify(code).styles
			}
		},
	}
}

export default config([
	{
		input: 'lib/material-styles/index.js',
		output: {file: './material-styles.js', format: 'iife'},
		plugins: [cleanCss(), cssModules(), terser()],
	},
	/** material-shell.js */
	{
		input: 'lib/material-shell/index.js',
		output: {file: './material-shell.js', format: 'iife'},
		plugins: [
			nodeResolve(),
			cleanCss(),
			cssModules(),
			minifyTemplateLiterals(),
			{
				name: 'rename-circular-progress-element',
				transform(code, id) {
					if (id.endsWith('material-shell/material-shell.js')) {
						code = code.replace(
							/<md-circular-progress /,
							'<md-circular-progress0 '
						)
						code = code.replace(
							/<\/md-circular-progress/,
							'</md-circular-progress0'
						)
						return code
					}
					if (id.endsWith('progress/circular-progress.js')) {
						return code.replace(
							/customElement\('md-circular-progress'\)/,
							"customElement('md-circular-progress0')"
						)
					}
				},
			},
			terser(),
		],
	},
	{
		input: './lib/material-shell/index.js',
		output: {file: './material-shell.js', format: 'iife'},
		plugins: [
			nodeResolve(),
			cleanCss(),
			cssModules(),
			minifyTemplateLiterals(),
			{
				name: 'rename-circular-progress-element',
				transform(code, id) {
					if (id.endsWith('material-shell/material-shell.js')) {
						code = code.replace(
							/<md-circular-progress /,
							'<md-circular-progress0 '
						)
						code = code.replace(
							/<\/md-circular-progress/,
							'</md-circular-progress0'
						)
						return code
					}
					if (id.endsWith('progress/circular-progress.js')) {
						return code.replace(
							/customElement\('md-circular-progress'\)/,
							"customElement('md-circular-progress0')"
						)
					}
				},
			},
			terser(),
		],
	},
])
