import {esbuildPlugin} from '@web/dev-server-esbuild';
import {fileURLToPath} from 'url';

/** @type {import('@web/dev-server').DevServerConfig} */
export default {
	nodeResolve: true,
	open: 'test.html',
	plugins: [
		esbuildPlugin({
			ts: true,
			tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
		}),
	],
};
