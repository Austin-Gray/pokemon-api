# Pokemon-api

## Run Locally

1. Install the dependencies:
```
npm install
```

Create a `.env` file with the following and insert the name of the postgres db you wish to use:
```
DATABASE_URL=postgres://postgres:postgres@localhost/{DB_NAME}?charset=utf8
```

2. Start the server:
```
npm start
```

3. The api is now available at http://localhost:3000

## Routes

- /pokemon returns data for all pokemon
- /pokemon/{number} returns details for an individual pokemon with the given number
- /pokemon/{name} returns details for an individual pokemon with the given name