// @ts-ignore


import * as webpack from "webpack";

const webpack = require('webpack');
const path = require("path");
const uglify = require('uglifyjs-webpack-plugin');

const conf = {
    mode: 'production',
    entry: __dirname + '/src/index.tsx',
        // commons: packagejson.dependencies.array

    devtool: 'false',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules|\.d\.ts$/
            },
            {
                test: /\.d\.ts$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    minChunks: 2,
                    reuseExistingChunk: true,
                    filename: 'commons.js'
                }
            }
        }
    },
    plugins: [
        new uglify()
    ]
};

module.exports = conf;