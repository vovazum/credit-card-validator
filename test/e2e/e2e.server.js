const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../webpack.config.js');

const compiler = webpack(config);
const server = new WebpackDevServer(config.devServer, compiler);

server.startCallback(() => {
  if (process.send) {
    process.send('ok');
  }
});
