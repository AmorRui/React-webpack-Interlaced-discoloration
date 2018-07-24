// 涉及到路径问题  引入path
var path = require('path');
// 引入生成html的插件
var htmlWebpackPlugin = require('html-webpack-plugin');
// 引入热更新插件
var webpack = require('webpack');
// 引入清除目录的插件
var cleanWebpackPlugin = require('clean-webpack-plugin');

var extractTextPlugin = require('extract-text-webpack-plugin');

var optimizeCss = require('optimize-css-assets-webpack-plugin')


module.exports = {
// 指定入口文件
  entry: {
    'main': path.join(__dirname, 'main.js'),
    'app': path.join(__dirname, 'app.js'),
    'vendors': ['jquery']
  },
// 指定出口文件
  output: {
    // 指定打包之后输出的路径
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module:{
    // 配置文件解析的规则
    rules: [
      // 解析css文件
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.css$/, use: extractTextPlugin.extract({
        fallback: [ 'style-loader' ],
        use: ['css-loader'],
        publicPath: '../'
      }) },
      // 解析scss文件  安装sass-loader 需要依赖 node-sass
      // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.scss$/, use:extractTextPlugin.extract({
        fallback: ['style-loader'],
        use:['css-loader', 'sass-loader'],
        publicPath: '../'
      }) },
      // 字体文件用file-loader
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      // 图片  file-loader  url-loader 两个loader都可以解析， url-loader 依赖于file-loader 
      // file-loader 不会对图片进行处理， url-loader会对图片进行base64编码  可以使用limit参数限制
      { test: /\.(png|bmp|jpg|jpeg)$/, use: 'url-loader?limit=1024&name=img/img-[hash:6].[ext]' },
      // webpack默认只能编译  es5的语法  
      // 安装babel-loader的命令  npm i babel-core babel-loader babel-plugin-transform-runtime --save
      // 安装preset字典   npm i babel-preset-env babel-preset-stage-0 --save
      // 还需要进行.babelrc 文件的配置
      // 使用babel-loader时  需要下载preset env 里面包含es6及之前的所有语法 
      { test: /\.js$/ , use:['babel-loader'], exclude: /node_modules/ }
    ]
  },
  optimization:{
    splitChunks:{
      chunks: "initial",
      name: "vendors"
    },
    minimize: true
  },
  // 配置插件的节点
  plugins: [
    // 将html文件进行打包  将生成的js文件自动注入到html文件的末尾
    new htmlWebpackPlugin({
      // 指定要处理的html文件模板
      template: path.join(__dirname, 'index.html'),
      // 指定生成的html文件的名称
      filename: 'index.html',
      minify:{// 压缩HTML代码
        collapseWhitespace:true, // 合并空白字符
        removeComments:true, // 移除注释
        removeAttributeQuotes:true // 移除属性上的引号
    }
    }),
    new cleanWebpackPlugin(['dist']),
    new extractTextPlugin('css/styles.css'),
    new optimizeCss()
  ]
}
