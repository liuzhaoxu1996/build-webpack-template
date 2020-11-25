const { merge } = require('webpack-merge');
const baseConfig = require('./sobuild.base');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const soBuildConfig = {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			<%_ if (webpack['terser-webpack-plugin']) {-%>
			new TerserPlugin({
				terserOptions: {
					mangle: true,
					ie8: true,
				},
			}),
			<%_}-%>
			<%_ if (webpack['css-minimizer-webpack-plugin']) {-%>
			new CssMinimizerPlugin({
				test: /bundle.css/g,
				parallel: true,
				minimizerOptions: {
					preset: [
						'default',
						{
							discardComments: { removeAll: true },
						},
					],
				},
			}),
			<%_}-%>
		],
	},
};

module.exports = merge(baseConfig, soBuildConfig);
