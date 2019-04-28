import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import pEvent from 'p-event';
import { Shirtshop } from './application';
import { ApplicationConfig } from '@loopback/core';
import * as history from 'connect-history-api-fallback';

export class ExpressServer {
  private app: express.Application;
  private lbApp: Shirtshop;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new Shirtshop(options);

    // gzip compression
    this.app.use(compression())

    const staticFileMiddleware = express.static('public');

    this.app.use('/api', this.lbApp.requestHandler);
    this.app.use(staticFileMiddleware);
    this.app.use(history());
    this.app.use(staticFileMiddleware);

    this.app.get('/', function (req, res) {
      res.render(path.join(__dirname + '/index.html'))
    })
  }
  async boot() {
    await this.lbApp.boot();
  }

  async start() {
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    const server = this.app.listen(port, host);
    await pEvent(server, 'listening');
  }
}
