import PokemonController from './pokemon_controller';
import { ResourceRouter } from 'hapi-resource-router';

export default (routes: ResourceRouter) => {
  routes.collection('pokemon', pokemon  => {
    pokemon.controller = new PokemonController();

    pokemon.index(); // GET /pokemon
    pokemon.items('poke', poke => {
      poke.show(); // GET /pokemon/{poke}
    });
  });
};