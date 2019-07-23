import {
  DataTypes,
  Model,
  Sequelize,
  FindOptions,
  QueryTypes,
  CreateOptions,
  UpdateOptions,
} from 'sequelize';
import { ById } from '../controllers/pokemon_controller';

const pokeCache: ById<Pokemon> = {}

export interface PokemonAttributes {
  name: string,
  url: string,
  id?: number,
  sprite?: string,
  types?: string[],
}

export default interface Pokemon extends PokemonAttributes { }
export default class Pokemon extends Model {

  static initialize(sequelize: Sequelize) {
    Pokemon.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      external_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },

      sprite: {
        type: DataTypes.STRING,
        allowNull: true
      },
      types: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    }, {
        sequelize,
        tableName: 'pokemon',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      })
  }
  // static create(pokemon: Pokemon) {
  //   pokeCache[pokemon.id] = pokemon;
  //   const { name, url, id, sprite, types } = pokemon
  //   return new Pokemon(name, url, id, sprite, types);
  // }
  static findById(id: number) {
    return pokeCache[id];
  }
};
