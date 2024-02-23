# Perspective User API

![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=2F73BF)
![Nest](https://img.shields.io/badge/-NestJs-black?style=for-the-badge&logo=nestjs&color=E0234D)

## 📋 Table of Contents

1. 👀 [What is this API ?](#what-is-this-api)
2. 📂 [File Structure](#file-structure)
3. 🔨 [Installation](#installation)
4. 🚀 [Build](#build)
5. 🐳 [Docker](#docker)
6. 💯 [Tests](#tests)

## <a name="what-is-this-api">👀 What is this API ?</a>

A **[NestJS](http://nestjs.com/)** based API to manage users for **[Perspective](https://www.perspective.co/)**

Functionalities include:

- Getting list of all users registered to the system
- Getting the list of users via ascending or descending order in terms of creation date
- Creating single user

### API Gateways

- **GET /user**

  - **GET /user?created=asc**
  - **GET /user?created=desc**

- **POST /user/create**

Expected payload for post request to create user can be found on [create-user.dto.ts](https://github.com/ozanerturk34/perspective-user/blob/main/src/user/models/dtos/create-user.dto.ts)

```bash
# Create User Payload Structure
 username: string  # Only alphanumeric characters with max char limit 100
 fullName: string # With max char limit 100
 age: number # positive integer
 gender: "male" | "female" | "other" # enum
```

### Main Components

#### UserController (user.controller.ts)

- Defines two endpoints
- Uses DTOs (`CreateUserDto` and `UserDto`) to ensure type safety and validation
- Relies on the `UserService` to handle the business logic.

#### UserService (user.service.ts)

- Interacts with the `UserRepository` to perform database operations, abstracting the logic away from the controller.
- Uses exception handling to handle unique constraint violation for `username`.

#### UserRepository (user.repository.ts)

- Extends `Repository<User>` from `TypeORM`, customized with additional methods for creating and fetching users.
- Makes use of the `DataSource` to create an entity manager for executing operations on the `User` entity.

#### User Entity (user.entity.ts)

- Maps to a database table using `TypeORM` decorators, defining columns for user properties and an index for the createdAt column to optimize queries.
- Includes validation for the `username` field using the `class-validator` library to ensure only alphanumeric characters are allowed.

## <a name="file-structure">📂 File Structure</a>

```
.
├── src
│   ├── app.module.ts            # Root application module
│   ├── main.ts                  # Application entry file
│   └── user                     # User feature module
│       ├── controllers          # User controllers
│       │   ├── user.controller.ts           # User requests handler
│       │   └── user.controller.spec.ts      # Tests for user.controller
│       ├── models               # Data models and DTOs
│       │   ├── dtos             # Data Transfer Objects
│       │   │   ├── create-user.dto.ts       # DTO for new user
│       │   │   └── user.dto.ts              # General user DTO
│       │   ├── entities         # Database entities
│       │   │   ├── user.entity.ts           # User database entity
│       │   │   └── user.repository.ts       # User operations repository
│       │   └── types            # Custom types and enums
│       │       ├── get-users-query.model.ts # Query params model
│       │       ├── sort-by.enum.ts          # Sorting parameter enum
│       │       └── user-gender.enum.ts      # User gender enum
│       └── services             # Business logic services
│           ├── user.service.ts              # User-related operations
│           └── user.service.spec.ts         # Tests for user.service
├── test                         # Test configurations
│   ├── app.e2e-spec.ts          # E2E tests for application
│   └── jest-e2e.json            # Jest config for e2e tests
└── ...
```

## <a name="installation">🔨 Installation</a>

To install this project, you will need to have on your machine :

![Node](https://img.shields.io/badge/-nodejs-black?style=for-the-badge&logoColor=white&logo=node.js&color=366A31)
![Docker](https://img.shields.io/badge/-Docker-black?style=for-the-badge&logoColor=white&logo=docker&color=004EA2)

I recommend to use the node version specified in the `.nvmrc` file.

**If you don't have `yarn` installed, you can still use `npm` for all commands below**

Before running the you will need to create a local postgres in this destination:

```type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'mysecretpassword',
database: 'postgres'
```

You can also rearrange the config info for the database in `app.module.ts`

I suggest docker to create and maintain the database. For more information go to **[Docker section](#docker)**

Then, run the following commands :

```bash
# Install dependencies
yarn install

# Run the app in dev mode
yarn start

# Run the app in watch mode
yarn start:dev
```

## <a name="build">🚀 Build</a>

In order to build the app for production, run the following command :

```bash
# Build the app
yarn build

# Run the app in production mode
yarn start:prod
```

## <a name="docker">🐳 Docker</a>

Arguably, easiest and most convenient way to create local database is with docker

Generally, **[docker's own postgres guide](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)** is very good.

Follow that to install docker and dashboard for better visibility

In order to get the postgres template for docker, run the following command :

```bash
# I suggest using postgres version < 16 due
# TypeORM is not compatible with postgres@16.0 or above

docker pull postgres:14.5
```

Then run the following command to create the database. Make sure `docker` app is on :

```bash
# Change the config values as needed
docker run --name perspective-user-api -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres:14.5
```

**Now you should be able to start the app in dev mode and database template should be automatically migrated via typeORM**

## <a name="tests">💯 Tests</a>

Business logic related part of the app hs 100% unit test coverage

### Unit Tests

#### User Controller and Service Tests:

- The ability to create a new user
- Retrieve a list of users.
- Proper handling of unique constraint violations when attempting to create a user with an existing username.

`UserRepository` is mocked for these tests

### End-to-End (E2E) Tests

#### Application Flow Tests:

Making HTTP requests to the user endpoints to:

- create a new user
- retrieve users

Using `NestJS` helpers to create a mock server via `supertest` and mocking the `UserService` to not effect actual database data

### Testing Frameworks and Tools

- Jest for main testing framework
- Supertest for E2E test to mock HTTP

To run the tests, use the following commands :

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
