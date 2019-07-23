import * as Sequelize from 'sequelize';
const dbConfigAll = require('../database/config');
const dbConfig = dbConfigAll['development'];

const db = new Sequelize.Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  protocol: dbConfig.protocol,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const start = db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  });

export default db;
