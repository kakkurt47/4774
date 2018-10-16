const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    server: './projects/intro/src/server.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  node: {
    __dirname: true,
    process: true
  },
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [
    /node_modules/,
    'domino',
    'express',
    /^rxjs*/i,
    /^@angular*/i
  ],
  output: {
    library: 'server',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '..', 'dist', 'intro'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: "tsconfig.server.json"
        }
      },
      {
        test: /main\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'sentry\/browser',
          replace: 'sentry\/node',
          flags: 'g'
        }
      }
    ]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for "WARNING Critical dependency: the request of a dependency is an expression"
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
