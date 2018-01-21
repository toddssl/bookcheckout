var express = require('express');

const webpack = require('webpack');
const config = require('./webpack.config.js');
const webpackMiddleware = require("webpack-dev-middleware");
const compiler = webpack(config);

app = express();
port = process.env.PORT || 3001;

app.use(webpackMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    lazy: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    // publicPath: "/assets/",  
    // index: "index.html",
    headers: { "X-Custom-Header": "yes" },
    stats: {
        colors: true
    },
    reporter: null,
    serverSideRender: false,
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(port);

console.log('server started on: ' + port);
