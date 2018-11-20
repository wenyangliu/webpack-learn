## 使用webpack
- 全局安装 (不推荐)
```$xslt
npm install webpack -g
```
- 本地安装
```$xslt
npm install webpack webpack-cli -D
```

## 在webpack中所有文件都是模块
- js模块 模块化(AMD CMD es6Module commonjs)

## 直接运行webpack
```$xslt
npx webpack
```

## webpack
- plugins
- loader

## css处理
```$xslt
style-loader css-loader less less-loader
```

## 图片处理
```$xslt
url-loader file-loader
```

## 学习到的插件

1. html-webpack-plugin  Html插件
2. clean-webpack-plugin 打包先清除以前文件
3. mini-css-extract-plugin 抽离css文件
4. purifycss-webpack glob 没用的css会被消除掉，不会被打包，要放在html插件下
5. copy-webpack-plugin 复制文件

