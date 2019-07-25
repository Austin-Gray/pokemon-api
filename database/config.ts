const dotenv = require('dotenv');

dotenv.config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not specified');
}

module.exports = {
  development: {
    url: DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres',
  }
};
