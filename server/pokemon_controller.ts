import * as Hapi from 'hapi';
import axios from 'axios';

interface ById<T> {
  [key:string]: T
};

interface Pokemon {
  name: string;
  url: string;
}

/**
 i would like you to fetch all data from the pokemon api, then provide a data format and interface that matches this:

{
  items: [...all pokemons],
  byId: {
    1: {...pokemonData},
    2...
  },
  meta: {
    count: 500,
  }
}
*/

export default class PokemonController {
  async index() {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=807');
    const pokedata = res.data;
    const meta: { count: string } = { count: pokedata.results.length };
    const items: Pokemon[] = pokedata.results;
    const byId: ById<Pokemon> = {};
    items.forEach((pokemon, i) => Object.assign(byId, { [i+1]: pokemon }));
    return { meta, items, byId };
  }
  async show(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const search = request.params.poke;
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const pokedata = res.data;
    return pokedata;
  }
}
