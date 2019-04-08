const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const PurifycssWebpack = require('purifycss-webpack')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

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
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './src/doc',
            to: 'public'
        }]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'webpack4.0学习',
            hash: true,
        }),
        // 必须放在HtmlWebpackPlugin后面
        // 没用的css会被消除掉
        new PurifycssWebpack({
            paths: glob.sync(path.resolve('src/*.html'))
        })
    ], // 插件配置
    mode: 'development', // 可以更改模式
    resolve: {}, // 配置解析
    module: {
        rules: [// 从右边往左写
            {
                test: /.html$/,
                use: 'html-withimg-loader'

            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 表示小于10kb的图片转为base64,大于10kb的是路径
                        outputPath: '/images/', //定义输出的图片文件夹
                        publicPath: 'http://www.baidu.com'
                    }
                }]
            },
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
            },
            {
                test: /\.css$/, use: [
                    // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {loader: 'postcss-loader'}
                ]
            }
        ]
    }
}

// 图片学习