const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js', // 入口
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve('./build')
    }, // 出口
    devServer: {
        contentBase: './build',
        port: 3000,
        compress: true, // 服务器压缩
        open: true, // 自动打开浏览器
        hot: true // 热更新
    }, // 开发服务器
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'webpack4.0学习',
            hash: true,
        }),
    ], // 插件配置
    mode: 'development', // 可以更改模式
    resolve: {}, // 配置解析
    module: {
        rules: [// 从右边往左写
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                        ]
                    }
                }
            }
        ]
    },
}

// source-map 学习