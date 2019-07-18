const Hapi = require('hapi');
const HapiResourceRouter = require('hapi-resource-router');
import routes from './src/routes/pokemon_routes';

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost'
});
const start = async () => {
  await server.register({
    plugin: HapiResourceRouter.default,
  });
  server.resources().add(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

start();
