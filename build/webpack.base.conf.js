'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  /**
   * Context 必须是一个绝对路径的字符串
   * Entry的路径及其以来的模块也是采用相对于 context 来设置的
  */
  context: path.resolve(__dirname, '../'),
  /**
   * entry 有三种类型，这里选择用object类型
   * 可以为多个页面配置Entry，如果需要动态设置，可以编写一个函数返回
  */
  entry: {
    app: './src/main.js'
  },
  /**
   * 这里output暂且只有一个Chunk输出，所以文件名写为静态
   * 如果有多个Chunk要输出，则使用‘[name].js’动态设置文件名称
  */
  output: {
    /**
     * path 为输出文件所在的目录
    */
    path: config.build.assetsRoot,
    filename: 'vue_3G.js',
    /**
     * 对于复杂项目，需要使用 publicPath 异步加载资源,而异步加载是通过JSONP动态插入实现的
     * 也就是配置发布到线上资源的URL前缀
     * eg: {
     *  filename: '[name]_[chunkhash:8].js'
     *  publicPath: 'https://cdn.qiniu.com/assets/'
     * }
    */
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    /**
     * 这里是配置 当前编写的库在导出的时候
     * libraryTarget：配置以何种方式导出库
     * library：导出库的名称
    */
    library: 'vue_3G',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    /**
     * 配置寻找模块所对应的文件
     * extensions 自动补全文件名后缀
     * alias 通过配置项将原导入路径映射成一条新的路径
     * modules 第三方模块查找路径
    */
    extensions: ['','.js', '.vue', '.json'],
    alias: {
      /**
       * vue$ 只会命中以 vue 结尾的导入语句
      */
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    modules: ['./src/components','node_modules']
  },
  module: {
    /**
     * 主要是关于webPack编译期间对载入文件的相关配置
     * 包括源文件筛选、文件转换等
     * 有很多地方可以优化，包括文件查找筛选操作等
    */
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
