const webpack = require('webpack');

const DEV = process.env.NODE_ENV !== 'production';
console.log("DEV = " + DEV);

module.exports = {
  bail: !DEV,
  devtool: DEV ? 'cheap-module-source-map' : 'source-map',
  target: 'node',
  entry: './scripts/server.js',
  output: {
    path: 'build/server',
    filename: 'bundle.js',
    publicPath: '/',
  },
  externals: (context, request, callback) => {
    // Externalize all npm modules.
    if (/^[a-z0-9-][a-z0-9-./]+$/.test(request)) {
      return callback(null, `commonjs ${request}`);
    }
    callback();
  },
  plugins: [
    new webpack.DefinePlugin({
      // prettier-ignore
      'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production'),
    }),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
};
