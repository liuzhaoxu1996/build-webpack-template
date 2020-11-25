const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
<%_ if (webpack['mini-css-extract-plugin']) {-%>
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
<%_}-%>
<%_ if (webpack['css-minimizer-webpack-plugin']) {-%>
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
<%_}-%>
<%_ if (webpack['terser-webpack-plugin']) {-%>
const TerserPlugin = require('terser-webpack-plugin');
<%_}-%>
<%_ if (webpack['purgecss-webpack-plugin']) {-%>
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
<%_}-%>
module.exports = {
	module: {
		entry: {},
		output: {},
		rules: [
			{
				test: /.js$/,
				use: [
					<%_ if (webpack['thread-loader']) { -%>
					{
						loader: 'thread-loader',
						options: {
							workers: 3,
						},
					},
					<%_}-%>
					'babel-loader?cacheDirectory=true',
				],
				exclude: /node_modules/,
			},
			<%_ if(webpack['ts-loader']) { -%>
			{
				test: /\.ts(x?)$/,
				use: [
					'babel-loader?cacheDirectory=true',
					{
						loader: 'ts-loader',
					},
				],
				exclude: /node_modules/,
			},
			<%_}-%>
			{
				test: /.css$/,
				use: [
					<%_ if (webpack['mini-css-extract-plugin']) {-%>
					MiniCssExtractPlugin.loader,
					<%_ } else {-%>
					'style-loader',
					<%_}-%>
					'css-loader',
					<%_ if (webpack['postcss-loader']) {-%>
					{
						loader: 'postcss-loader',
					}
					<%_}-%>
				],
			},
			<%_ if (webpack['less-loader']) {-%>
			{
				test: /.less$/,
				use: [
					<%_ if (webpack['mini-css-extract-plugin']) {-%>
					MiniCssExtractPlugin.loader,
					<%_ } else {-%>
					'style-loader',
					<%_}-%>
					'css-loader',
					'less-loader',
					<%_ if (webpack['postcss-loader']) {-%>
					{
						loader: 'postcss-loader',
					}
					<%_}-%>
				],
			},
			<%_}-%>
			<%_ if (webpack['file-loader']) {-%>
			{
				test: /.(png|jpg|gif|jpeg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
				],
			},
			<%_}-%>
		],
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx', '.css'],
		alias: {
			
		}
	}
	optimization: {
		minimize: true,
		minimizer: [
			<%_ if (webpack['css-minimizer-webpack-plugin']) {-%>
			new CssMinimizerPlugin({
				parallel: true,
				cache: true,
			}),
			<%_}-%>
			<%_ if (webpack['terser-webpack-plugin']) {-%>
			new TerserPlugin({
				parallel: true, // 默认值：2*cpu -1
				terserOptions: {
					mangle: true, 
					ie8: true,
					safari10: true,
				},
			}),
			<%_}-%>
		],
		<%_ if (webpack['split-chunks-plugin']) {-%>
		splitChunks: {
			minChunks: 1,
			chunks: 'all',
			cacheGroups: {
				common: {
					name: 'common',
					chunks: 'initial',
					priority: 2,
					minChunks: 2,
				},
				styles: {
					name: 'common',
					test: /\.css$/,
					chunks: 'all',
					minChunks: 2,
					enforce: true,
					priority: 20,
				},
			},
		},
		<%_}-%>
	},
	plugins: [
		new CleanWebpackPlugin(),
		<%_ if (webpack['mini-css-extract-plugin']) {-%>
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
		}),
		<%_}-%>
		<%_ if (webpack['purgecss-webpack-plugin']) {-%>
		new PurgeCSSPlugin(),
		<%_}-%>
		new FriendlyErrorsWebpackPlugin(),
	],
	stats: 'errors-only',
};
