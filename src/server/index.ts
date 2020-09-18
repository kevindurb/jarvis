import http from 'http';
import express from 'express';
import socket from 'socket.io';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';
import handler from './handler';

const compiler = webpack(webpackConfig);
const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', handler);

app.use(webpackDevMiddleware(compiler, {}));

server.listen(3000);
