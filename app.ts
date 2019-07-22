import { default as s } from './src/server';

s.then(async (server) => {

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
});
