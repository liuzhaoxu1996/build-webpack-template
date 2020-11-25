const path = require('path');
const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./sobuild.base');
const smp = new SpeedMeasurePlugin();
const address = require('address');

const soBuildConfig = smp.wrap({
	mode: 'development',
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerHost: address.ip(),
			analyzerPort: 60360,
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
	},
});

module.exports = merge(baseConfig, soBuildConfig);
