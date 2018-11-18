const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    // entry: ['./src/index.js', './src/a.js'], // 入口
    // 多入口，多出口
    entry: {
      index: './src/index.js',
      a: './src/a.js'
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve('./build')
    }, // 出口
    devServer: {
        contentBase: './build',
        port: 3000,
        compress: true, // 服务器压缩
        open: true // 自动打开浏览器
    }, // 开发服务器
    module: {}, // 模块配置
    plugins: [
        // 打包html插件
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',
            title: 'webpack4.0学习',
            hash: true,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'b.html',
            template: './src/index.html',
            title: 'webpack4.0学习',
            hash: true,
            chunks: ['a']
            // minify: {
            //     // 去除双引号
            //     removeAttributeQuotes: true,
            //     // 去除空格
            //     collapseWhitespace: true
            // }
        })
    ], // 插件配置
    mode: 'development', // 可以更改模式
    resolve: {}, // 配置解析
}

// 1.在webpack中如何配置开发服务器 webpack-dev-server
// 2.webpack插件 1将html打包build下可以自动