
const path = require('path')
const fs = require('fs')

module.exports = {
    prompts: {
        name: {
            type: 'string',
            required: true,
            message: 'Project name',
        },
        description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'A project with sobuild-cli',
        },
        author: {
            type: 'string',
            message: 'Author',
        },
        webpack: {
            type: 'checkbox',
            message:
                'sobuild: 构建webpack基础配置',
            choices: [
                {
                    name: 'css-loader: 支持.css 文件的加载和解析',
                    value: 'css-loader',
                    short: 'css',
                },
                {
                    name: 'less-loader: 将 less 文件转换成 css',
                    value: 'less-loader',
                    short: 'less',
                },
                {
                    name: 'post-loader: css兼容',
                    value: 'post-loader',
                    short: 'post',
                },
                {
                    name: 'ts-loader: 将 TS 转换成 JS',
                    value: 'ts-loader',
                    short: 'ts',
                },
                {
                    name: 'file-loader: 进行图片、字体等打包',
                    value: 'file-loader',
                    short: 'file',
                },
                {
                    name: 'html-webpack-plugin: 默认根据配置将 css，js 文件注入到 html',
                    value: 'html-webpack-plugin',
                    short: 'html',
                },
                {
                    name: 'mini-css-extract-plugin: 取代 style-loader，提取 js 中的 css 成单独文件',
                    value: 'mini-css-extract-plugin',
                    short: 'miniCss',
                },
                {
                    name: 'css-minimizer-webpack-plugin: 压缩 css',
                    value: 'css-minimizer-webpack-plugin',
                    short: 'cssMinimizer',
                },
                {
                    name: 'terser-webpack-plugin: 多进程压缩',
                    value: 'terser-webpack-plugin',
                    short: 'terser',
                },
                {
                    name: 'split-chunks-plugin: 分包',
                    value: 'split-chunks-plugin',
                    short: 'split',
                },
            ],
        },
        skipInterpolation: [
            ".babelrc",
            ".eslintrc.js",
            ".npmrc",
            ".yarnrc",
            ".prettierignore",
            ".prettierrc",
            "stylelint.config.js",
            ".gitignore",
        ],
        autoInstall: {
            type: 'list',
            message:
                'Should we run `yarn install` for you after the project has been created? (recommended)',
            choices: [
                {
                    name: 'Yes, use Yarn',
                    value: 'yarn',
                    short: 'yarn',
                },
                {
                    name: 'Yes, use Npm',
                    value: 'npm',
                    short: 'npm',
                },
                {
                    name: 'No, I will handle that myself',
                    value: false,
                    short: 'no',
                },
            ],
        },
    },
    filters: {
        '.npmrc': 'autoInstall === "npm"',
        '.yarnrc': 'autoInstall === "yarn"',
    },
    complete: function (data, { chalk }) {
    },
}