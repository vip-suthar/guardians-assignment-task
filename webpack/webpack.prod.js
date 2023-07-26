const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

const CURRENT_WORKING_DIR = process.cwd();
const NODE_ENV = process.env.NODE_ENV;

const config = {
    mode: 'production',
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'js/[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(path.join(CURRENT_WORKING_DIR, '/client/src')),
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require("autoprefixer")()
                                ],
                            }
                        },
                    },
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            publicPath: '../images',
                            name: '[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                            publicPath: '../fonts',
                            name: '[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        minimize: true,
        nodeEnv: 'production',
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                styles: {
                    test: /\.css$/,
                    name: 'styles',
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        comparisons: false
                    },
                    parse: {},
                    mangle: true,
                    output: {
                        comments: false,
                        ascii_only: true
                    }
                }
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(CURRENT_WORKING_DIR, 'client/public/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
        new WebpackPwaManifest({
            short_name: "Guardians",
            name: "Guardians",
            description: "Assignment Task for Guardians",
            background_color: '#FFFFFF',
            theme_color: '#818CF8',
            inject: true,
            ios: true,
            icons: [
                {
                    src: path.resolve("client/public/icons/favicon.ico"),
                    destination: "icons",
                    sizes: [64, 32, 24, 16],
                    type: "image/x-icon"
                },
                {
                    src: path.resolve("client/public/icons/logo192.png"),
                    destination: "icons",
                    sizes: [192],
                    type: "image/png"
                },
                {
                    src: path.resolve("client/public/icons/logo512.png"),
                    destination: "icons",
                    sizes: [512],
                    type: "image/png"
                },
                {
                    src: path.resolve("client/public/icons/apple-touch-icon.png"),
                    destination: "icons",
                    sizes: [120, 152, 167, 180],
                    ios: true
                }
            ],
        })
    ]
};

module.exports = merge(common, config);
