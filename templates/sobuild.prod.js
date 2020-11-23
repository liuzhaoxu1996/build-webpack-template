const { merge } = require('webpack-merge');
const baseConfig = require('./sobuild.base');

const soBuildConfig = {
	entry: {},
	output: {},
	module: {
		rules: [
		],
	},
	resolve: {
		extensions: [
			'.js',
			'.css',
			<%_ if (webpack['ts-loader']) {-%>
			'ts',
			'tsx',
			<%_}-%>
		],
		alias: {
		},
	},
	optimization: {
	},
	plugins: [
	],
	stats: 'errors-only',
};

module.exports = merge(baseConfig, soBuildConfig);
