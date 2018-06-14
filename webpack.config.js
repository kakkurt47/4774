const path = require('path');

module.exports = {
  entry: {
    server: './main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  node: {
    __dirname: true,
    process: true
  },
  externals: [
    /^rxjs*/i, 'ipfs', 'electron', 'request', 'async', 'tempfile'
  ],
  output: {
    library: 'server',
    libraryTarget: 'commonjs',
    path: path.join(__dirname),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.electron.json'
        }
      }
    ]
  }
};
