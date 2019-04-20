import { Request, Response } from 'express';
import * as path from 'path';
import * as express from 'express';
import pEvent from 'p-event';
import { Shirtshop } from './application';
import { ApplicationConfig } from '@loopback/core';

export class ExpressServer {
  private app: express.Application;
  private lbApp: Shirtshop;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new Shirtshop(options);

    let serveIndex = function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/index.html'));
    }
    this.app.get('/', serveIndex);
    this.app.use('/api', this.lbApp.requestHandler);
    this.app.use(express.static('public'));
    this.app.use((req: Request, res: Response) => {
      res.redirect(301, '/');
      req.url = '/'
    });
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
