import * as Hapi from 'hapi';
import axios from 'axios';

interface ById<T> {
  [key:string]: T
};

interface Pokemon {
  name: string;
  url: string;
}

export default class PokemonController {
  async index(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=807');
      const pokedata = res.data;
      const meta: { count: number } = { count: pokedata.results.length };
      const items: Pokemon[] = pokedata.results;
      const byId: ById<Pokemon> = {};
      items.forEach((pokemon, i) => Object.assign(byId, { [i+1]: pokemon }));
      return { meta, items, byId };
    } catch (err) {
      return h.response('Not found').code(404);
    }
  }
  async show(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const search = request.params.poke;
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`);
      const pokedata = res.data;
      return pokedata;
    } catch (err) {
      return h.response('Not found').code(404);
    }
  }
}
