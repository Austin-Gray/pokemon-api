const Hapi = require('hapi');
const HapiResourceRouter = require('hapi-resource-router');
const Lab = require('@hapi/lab');
const lab = exports.lab = Lab.script();
const { afterEach, beforeEach, describe, it } = lab;
const { expect } = require('@hapi/code');
const routes = require('../src/routes/pokemon_routes').default;

describe('Server', () => {
  let server;

  beforeEach(async () => {
    server = new Hapi.Server();
    await server.register({
      plugin: HapiResourceRouter.default,
    });
    server.resources().add(routes);
    await server.start();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds to GET /pokemon', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/pokemon'
    });
    expect(response.statusCode).to.equal(200);
    expect(response.payload.toString()).to.contain('bulbasaur');
  });

  it('responds to GET /pokemon/{number}', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/pokemon/1'
    });
    expect(response.statusCode).to.equal(200);
    expect(response.payload.toString()).to.contain('bulbasaur');
  });

  it('responds to GET /pokemon/{name}', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/pokemon/bulbasaur'
    });
    expect(response.statusCode).to.equal(200);
    expect(response.payload.toString()).to.contain('bulbasaur');
  });

  it('responds to GET /pokemon/{invalid search} with a 404 error', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/pokemon/invalidsearch'
    });
    expect(response.statusCode).to.equal(404);
  });
});
