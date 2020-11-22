const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const baseConfig = require(path.join(process.env.Home, '.sobuild-tempaltes/sobuild.base.js'));
const projectRoot = process.cwd();

const smp = new SpeedMeasurePlugin();
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            // '/Users/cpselvis/my-project/src/index/index.js'

            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            return htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(projectRoot, `./src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false,
                    },
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins,
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

const soBuildConfig = smp.wrap({
    entry: entry,
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
        ],
    },
    optimization: {
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        ...htmlWebpackPlugins
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    },
    stats: 'errors-only',
});

module.exports = merge(baseConfig, soBuildConfig)
