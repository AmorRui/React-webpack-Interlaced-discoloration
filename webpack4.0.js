"use strict";

// 引入路径
const path = require("path");
// 生成HTML文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清理dist文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin");
// 启用模块热替换
const webpack = require("webpack");
// 实时刷新页面
const BrowserSyncWebpackPlugin = require("browser-sync-webpack-plugin");
// 复制文件
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 配置文件解析的规则
  module: {
    rules: [
      // 解析css文件
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      // 解析less文件
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
        exclude: path.resolve(__dirname, "node_modules")
      },
      // 解析sass文件
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: path.resolve(__dirname, "node_modules")
      },
      // 解析图片
      { test: /\.(png|svg|jpg|gif)$/, use: ["file-loader"] },
      // DataURL对图片进行base64处理，使用limit参数进行处理
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: "url-loader", options: { limit: 8192 } }]
      },
      // 解析字体
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ["file-loader"] },
      // 加载数据
      { test: /\.(csv|tsv)$/, use: ["csv-loader"] },
      { test: /\.(xml)$/, use: ["xml-loader"] },
      // ES6
      {
        test: /\.js$/,
        use: ["babel-loader"]
      }
    ]
  },
  // 追踪原始错误文件
  devtool: "inline-source-map",
  // web服务器,实时重新加载，dist文件为实时访问文件夹
  devServer: {
    // 当404 自动跳转回首页
    historyApiFallback: true,
    // 让命令中少一些输出
    noInfo: true,
    // 代理
    proxy: {
      // 只有/api开头的请求地址，才会被代理
      // 如果请求地址是 /test/home,这种不以/api开头的，是不会被代理的
      // 示例： /api/logout, 最终会变成  http://api.xxx.com/v1/logout
      "/api/*": {
        // 目标服务器地址
        // target: "http://127.0.0.1:7001/",
        target: 'http://api.botue.com/',
        // 目标服务器地址是否是安全协议
        secure: false,
        // 是否修改来源, true时-->让目标服务器以为是webpack-dev-server发出的请求
        changeOrigin: true,
        // '/api/login' =>    target + '/login'
        // 将/api开头的请求地址, /api 改为 /, 即 /api/xx 改为 /xx
        pathRewrite: { "^/api": "/" }
        // http://api.xxx.com/v1/login
      },
      contentBase: "./dist",
      hot: true
    },
  },
  plugins: [
    // 清理dist文件夹
    new CleanWebpackPlugin(["dist"]),
    // HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {collapseWhitespace: true} 
    }),
    // 启用HMR
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // // 实时刷新页面  与 webpack-dev-serv
    new BrowserSyncWebpackPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["dist"] }
    }),
    // 复制文件使用
    new CopyWebpackPlugin([
      {
        from: "./src/assets",
        to: "./assets"
      }
    ])
  ],
  // 出口文件
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  mode: "production"
}

