const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const baseConfig = require(path.join(process.env.Home, '.sobuild-tempaltes/webpack/sobuild.base.js'));
const projectRoot = process.cwd();
const smp = new SpeedMeasurePlugin();

const { entry, htmlWebpackPlugins } = setMPA();

const soBuildConfig = smp.wrap({
    entry: {},
    output: {
    },
    module: {
        rules: [
        ],
    },
    optimization: {
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.css'],
        alias: {
        }
    }, 
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    },
    stats: 'errors-only',
});

module.exports = merge(baseConfig, soBuildConfig)
