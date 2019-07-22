const Hapi = require('hapi');
const HapiResourceRouter = require('hapi-resource-router');
import routes from './routes/pokemon_routes';

export default Promise.resolve((async () => {

  const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
  });

  await server.register({
    plugin: HapiResourceRouter.default,
  });
  server.resources().add(routes);
  
  return server;
})());
