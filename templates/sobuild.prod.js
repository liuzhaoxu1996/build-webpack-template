const path = require('path');
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
		extensions: ['.js', '.css'],
		alias: {
		}
	},
	optimization: {
	},
	plugins: [
	],
	stats: 'errors-only',
};

module.exports = merge(baseConfig, soBuildConfig)
