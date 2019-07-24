import * as Hapi from 'hapi';
import axios from 'axios';
import { Pokemon } from '../models';

export interface ById<T> {
  [key:number]: T;
};

interface PokeType {
  slot: number;
  type: { name: string };
}

export default class PokemonController {
  async index(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      let { offset = '0' , limit = '20' } = request.query;
      if (limit === '0') limit = '20';
      const last: number = +offset + +limit;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const pokedata = res.data;
      const meta: { count: number } = { count: pokedata.results.length };
      const uri: string = request.server.info.uri;
      const next: string = `${uri}/pokemon?offset=${last}&limit=${limit}`;
      const items: Pokemon[] = pokedata.results;
      const byId: ById<Pokemon> = {};
      items.forEach((pokemon, i) => Object.assign(byId, { [+offset+i+1]: pokemon }));
      return { meta, next, items, byId };
    } catch (err) {
      if (err.response) return h.response(err.response.statusText).code(err.response.status);
      else return h.response('Internal Server Error').code(500);
    }
  }
  async show(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const search = request.params.poke;
      let pokemon;
      if (parseInt(search)) {
        pokemon = await Pokemon.findOne({ where: { external_id: parseInt(search) } });
      } else {
        pokemon = await Pokemon.findOne({ where: { name: search } });
      }
      if (pokemon) return pokemon;
      else {
        const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
        const res = await axios.get(url);
        const name = res.data.name;
        const id = res.data.id;
        const types = res.data.types.map((e: PokeType) => e.type.name);
        const sprite = res.data.sprites.front_default;
        const result = await Pokemon.upsert({ name, url, external_id: id, sprite, types }, { returning: true });
        return result;
      }
    } catch (err) {
      if (err.response) return h.response(err.response.statusText).code(err.response.status);
      else return h.response('Internal Server Error').code(500);
    }
  }
}
