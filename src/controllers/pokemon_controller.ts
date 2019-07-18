import * as Hapi from 'hapi';
import axios from 'axios';
import Pokemon from '../models/Pokemon';

interface ById<T> {
  [key:number]: T
};

interface PokeType {
  slot: number;
  type: { name: string }
}

const pokeCache: ById<Pokemon> = {}

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
    if (pokeCache[parseInt(search)]) return pokeCache[parseInt(search)];
    else {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
        const res = await axios.get(url);
        const name = res.data.name;
        const id = res.data.id;
        const types = res.data.types.map((e: PokeType) => e.type.name);
        const sprite = res.data.sprites.front_default
  
        const pokemon = new Pokemon(name, url, id, sprite, types);
  
        pokeCache[id] = pokemon;
        return pokemon;
      } catch (err) {
        return h.response('Not found').code(404);
      }
    }
  }
}
