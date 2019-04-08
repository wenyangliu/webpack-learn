const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const PurifycssWebpack = require('purifycss-webpack')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
    plugins: [
        // 打包html插件
        // 拷贝插件
        new CopyWebpackPlugin([{
            from: './src/doc',
            to: 'public'
        }]),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
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
                test: /\.css$/, use: [
                    // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'}
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 表示小于10kb的图片转为base64,大于10kb的是路径
                        outputPath: 'images' //定义输出的图片文件夹
                    }
                }]
            }
        ]
    }, // 模块配置
}

// 1.在webpack中如何配置开发服务器 webpack-dev-server
// 2.webpack插件 1将html打包build下可以自动

// 3.抽离样式 抽离到一个css文件 通过css文件引用