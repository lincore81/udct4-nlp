// Since the repo is from 2019 (!) and has many issues, I rebuilt the webpack config from scratch.
// Seperate config files are no longer necessary to enable separate environments.
/* eslint-env node */
const path = require('path');

const DotenvPlugin = require('dotenv-webpack');
const ESLintPlugin = require("eslint-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/client/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new ESLintPlugin({
            extensions: ['.ts', '.ts', '.js'],
            exclude: 'node_modules'
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/client/icons", to: "icons" },
            ],
        }),
        new DotenvPlugin(),
        new HTMLPlugin({template: 'src/client/views/index.html'}),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
