/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require('path');

const DotenvPlugin = require('dotenv-webpack');
const ESLintPlugin = require("eslint-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
    entry: './src/client/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
        new GenerateSW({
          clientsClaim: true,
          skipWaiting: true
        })
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
