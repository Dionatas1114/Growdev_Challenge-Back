# Growdev_Challenge_API

This API is part of the Course Conclusion Work of the [Growdev Starter Program](https://www.dropbox.com/s/qea757td5p7zust/certificado.pdf?dl=0) and was developed in January 2021 to test students skills in Node.

## About this API

* `Growdev_Challenge_API` is a REST API built on `Node.js` and `Express.js` that integrates with the `Postgres` database through `sequelize` (ORM). The database is configured and active, so you can use it. I just ask you not to delete the data in it.

* The access control follows `Bearer Token` spec with the help of `Jsonwebtoken` and `Bcryptjs`.

## Overview

This API contains models

## How to use

To test this API in a REST Client aplication, [download the JSON file](https://www.dropbox.com/s/aiqlov2c5629fd4/Desafio-FullStack-Growdev-BACK.postman_collection.json?dl=0) and import.

### Run server as **dev** and **debug**

```sh
npm dev
# alias for
nodemon src/server.js

npm dev:debug
# alias for
nodemon --inspect src/server.js
```

### Login with the Standard User
```
{
    "email": "user2@gmail.com",
    "password": "123456"
}
```

### Tests
```sh
npm pretest
# alias for
cross-env NODE_ENV=test sequelize db:migrate

npm test
# alias for
jest

npm posttest
# alias for
cross-env NODE_ENV=test sequelize db:migrate:undo:all
```

### Modules used

*devDependencies*

* [nodemon](https://www.npmjs.com/package/nodemon)
* [sqlite3](https://www.npmjs.com/package/sqlite3)
* [sucrase](https://www.npmjs.com/package/sucrase)
* [supertest](https://www.npmjs.com/package/supertest)
* [jest](https://www.npmjs.com/package/jest)
* [@sucrase/jest-plugin](https://www.npmjs.com/package/@sucrase/jest-plugin)
* [@types/jest](https://www.npmjs.com/package/@types/jest)
* [faker](https://www.npmjs.com/package/faker)
* [cross-env](https://www.npmjs.com/package/cross-env)
* [eslint](https://www.npmjs.com/package/eslint)
* [prettier](https://www.npmjs.com/package/prettier)
* [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)

*dependencies*

* [express](https://www.npmjs.com/package/express)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [pg](https://www.npmjs.com/package/pg)
* [pg-hstore](https://www.npmjs.com/package/pg-hstore)

## Features to be developed

1. Unitary and integration tests with `jest`.

## Author

Created and maintained by [Diônatas Batista Lazzari](https://www.linkedin.com/in/dionatas-lazzari-dev/).

## License

`Growdev_Challenge-Back` is available under the MIT license.
