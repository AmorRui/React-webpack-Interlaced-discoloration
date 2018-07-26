"use strict";

  const path = require('path')
  const Webpack = require('webpack')
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const CleanWebpackPlugin = require("clean-webpack-plugin");

  const CopyWebpackPlugin = require('copy-webpack-plugin')
  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"],
          exclude: path.resolve(__dirname, "node_modules")
        },
        {
          test: /\.js$/,
          loader: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(jpg|png|jpeg|bmp|gif)$/,
          loader: ['url-loader?limit=5124&name=./dist/images/[name].[ext][hash]']
        },
        {
          test: /\.(jpg|png|jpeg|bmp|gif)$/,
          loader: ['file-loader?name=./dist/assets/images/[name].[ext][hash]']
        },
        { test: /\.(ttf|woff|woff2|eot|svg)$/,
          loader: ['file-loader?name=./dist/fonts/[name].[ext][hash]']
        }
      ]
    },
    devtool: "inline-source-map",
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
        // 启用热替换属性
        hot: true,
        // 使用颜色
        colors: true,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new CopyWebpackPlugin([{
        from: './src/assets',
        to: './assets'
      }])
    ]
  }
