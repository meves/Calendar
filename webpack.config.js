const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';
console.log(`development : ${IS_DEV}`);

const optimize = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (!IS_DEV) {
        config.minimize = true,
        config.minimizer = [new TerserWebpackPlugin(), new CssMinimizerPlugin()]
    } 
    return config;
}

const filename = ext => IS_DEV ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.tsx',
    },
    output: {
        publicPath: '/',
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            'Store': path.resolve(__dirname, 'src/store/'),
            'Axios': path.resolve(__dirname, 'src/axios/'),
            'Components': path.resolve(__dirname, 'src/components/'),
            'Pages': path.resolve(__dirname, 'src/pages/')
        }
    },
    optimization: optimize(),
    devServer: {
        port: 3000,
        hot: IS_DEV,
        historyApiFallback: true,
    },
    devtool: "inline-source-map",
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !IS_DEV
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [                
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/data/data.json'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCSSExtractPlugin({
            filename: filename('css')
        }),
        new ESLintPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.REACT_APP_BASE_URL': JSON.stringify(process.env.REACT_APP_BASE_URL),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCSSExtractPlugin.loader, 
                    { loader: "css-modules-typescript-loader"},
                    { loader: "css-loader", options: { modules: true } }, 
                    'sass-loader']
            },
            {
                test: /\.(m?[jt]s)|([jt]sx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', 
                                    '@babel/preset-typescript',
                                    '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }    
}
