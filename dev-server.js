/**
 * Created by 80920 on 2017/4/26.
 */
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack2.config')
const path = require('path')
const compiler = webpack(config)
const serverPort = 8080
const server = new WebpackDevServer(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  contentBase: './dist',
  stats: {
    colors: true,
  },
})
server.listen(serverPort, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at http://localhost:${serverPort}/`)
})


