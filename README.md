## Description
**Almedia** offers application with [Nest](https://github.com/nestjs/nest) and TypeScript.

## Endpoints

| Method  | Path | Description |
| :-----: | :--- | :--------- |
| GET | `/offers` | List all available offers. |
| GET | `/offers/:id`  | Get offer by ID. |
| POST | `/offers`  | Create new offer. |

## Installation

```bash
$ yarn install
$ cp .env.example .env
$ yarn start:dev
```
Make sure you update your `.env` database values.
The application will start at port `3000`.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
