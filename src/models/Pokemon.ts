interface Pokemon {
  id?: number;
  name: string;
  sprite?: string;
  types?: string[];
  url: string;
}

class Pokemon {
  constructor(pokemon: Pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.sprite = pokemon.sprite;
    this.types = pokemon.types;
    this.url = pokemon.url;
  }
};

export default Pokemon;
