import { default as s } from './src/server';
import { start as dbStart } from './src/db';

s.then(async (server) => {

  await dbStart;

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
});
