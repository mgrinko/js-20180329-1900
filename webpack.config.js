const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './frontend/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },

      {
        test: /\.hbs/,
        loader: "handlebars-loader"
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
    })
  ]
};



// const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const webpack = require('webpack');
//
// module.exports = {
//   mode: 'none',
//   entry: './scripts/app.js',
//   output: {
//     filename: 'build.js',
//     path: path.resolve(__dirname, 'public'),
//   },
//   watch: true,
//   devtool: 'source-map',
//
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ['@babel/plugin-transform-runtime'],
//           }
//         }
//       },
//
//       {
//         test: /\.hbs/,
//         loader: "handlebars-loader"
//       },
//
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       }
//
//     ]
//   },
//
//   plugins: [
//     new UglifyJsPlugin({
//       sourceMap: true,
//     }),
//     new webpack.NamedModulesPlugin(),
//     new webpack.HotModuleReplacementPlugin()
//   ],
//
//   devServer: {
//     contentBase: '.',
//     hot: true
//   },
// };
