import { ExpressServer } from './server';
import { Shirtshop } from './application';
import { ApplicationConfig } from '@loopback/core';

export { Shirtshop };

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  console.log('server has started');

  return server;
}
