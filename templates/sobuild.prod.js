const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require(path.join(process.env.Home, '.sobuild-tempaltes/webpack/sobuild.base.js'));

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
