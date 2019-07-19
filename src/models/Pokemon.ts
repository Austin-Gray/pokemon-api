import { ById } from '../controllers/pokemon_controller';

const pokeCache: ById<Pokemon> = {}

class Pokemon {
  constructor(
    public name: string,
    public url: string,
    public id?: number,
    public sprite?: string,
    public types?: string[],
  ) {}
  static create(pokemon: Pokemon) {
    pokeCache[pokemon.id] = pokemon;
    const { name, url, id, sprite, types } = pokemon
    return new Pokemon(name, url, id, sprite, types);
  }
  static findById(id: number) {
    return pokeCache[id]
  }
};

export default Pokemon;
