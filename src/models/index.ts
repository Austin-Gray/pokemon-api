import { Sequelize } from 'sequelize';
import sequelize from '../db';

interface ModelDefinition {
  name: string;
  initialize(sequelize: Sequelize): void;
  associate?: (sequelize: Sequelize) => void;
  associateBehaviors?: () => void;
}

interface Models {
  [key: string]: ModelDefinition;
}

const models: Models = {};

const isModelDefinition = (val: any): val is ModelDefinition => {
  return 'initialize' in val;
};

const initialize = (model: any) => {
  if (isModelDefinition(model)) {
    model.initialize(sequelize);
    models[model.name] = model;
  }
};

import Pokemon from './Pokemon';
initialize(Pokemon);


for (const model of Object.values(models)) {
  if (model.associate) {
    model.associate(sequelize);
  }
  if (model.associateBehaviors) {
    model.associateBehaviors();
  }
}

export {
  Pokemon
};
