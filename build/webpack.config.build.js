var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
const open = require('open');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourcePath =  './src';

const wpConfig = {
  entry: {
    'app': [`${sourcePath}/app.js`],
    'content-page': `${sourcePath}/content-page.js`,
    'background': [`${sourcePath}/background.js`, 'whatwg-fetch'],
    'injected': `${sourcePath}/injected.js`,
    vendors: ['vue', 'vue-material'],
  },
  output: {
    path: path.join('./', 'dist'),
    filename: '[name].build.js',
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
    extensions: ['', '.js', '.vue'],
    root: [
      // path.resolve(__dirname),
      path.resolve(sourcePath),
    ]
  },

  // resolveLoader: {
  //   fallback: [path.join(__dirname, '../node_modules')]
  // },
  
  watch: true,

  module: {
    loaders: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js|\.vue$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.html$/,
        loader: 'raw',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css?root=' + __dirname + sourcePath, 'sass-loader', 'sass'],
      },
      {
        test: /\.css/,
        loaders: ['style', 'css?root=' + __dirname + sourcePath, 'css-loader', 'css'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',

      },
    ]
  },
  vue: {
    loaders: {
      scss: 'style!css!sass'
    }
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new CopyWebpackPlugin([
      {from: 'src/libs', to: ''},
      {from: 'iconfont', to: 'iconfont'},
      {from: 'icons', to: 'icons'},
      {from: 'index.html', to: 'index.html'},
      {from: 'manifest.json', to: 'manifest.json'},
    ]),
    // new webpack.DefinePlugin({})
  ],
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

  sassLoader: {
    includePaths: [path.resolve(__dirname, sourcePath)]
  },
  // devtool: '#source-map',
  debug: false,
  // debug:true,
  // devtool:"#inline-source-map",

  // devServer: {
  //   host: '0.0.0.0',
  //   port: '9095',
  //   stats: {
  //     assets: true,
  //     colors: true,
  //     version: true,
  //     hash: false,
  //     timings: true,
  //     chunks: true,
  //     chunkModules: false
  //   }
  // }
};


if(process.env.NODE_ENV != 'STAGE') {
  wpConfig.debug = true;
  wpConfig.devtool = "#inline-source-map";
  // open('http://localhost:9095/examples');
}

module.exports = wpConfig;
