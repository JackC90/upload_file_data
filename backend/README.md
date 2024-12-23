# TypeScript Express API

This is a TypeScript-based Express API that serves as a backend for your application. It provides endpoints for managing posts and supports file uploads.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Running Unit Tests](#running-unit-tests)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node package manager)
- [TypeScript](https://www.typescriptlang.org/) (optional, but recommended for development)

## Installation

1. Go into the backend directory of the project:

   ```bash
   cd ./backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables. Here’s an example:

   ```yaml
   PORT=8061
   DB_HOST="localhost"
   DB_PORT=5442
   DB_USER="user"
   DB_PASSWORD="password"
   DB_NAME="posts"
   APP_URL="http://localhost:3021"
   ```

## Configuration

- Ensure you have a PostgreSQL database set up and running.
- Update the `.env` file with your database credentials.
- If you are using a different database, update the database configuration in `knexfile.js`.
- Run the database migration in the command line:

  ```bash
  npx knex migrate:latest
  ```

## Running database in Docker

1. An easy way to run the databases is using Docker. Firstly, Docker must be installed on your computer. [Install it here.](https://docs.docker.com/engine/install/)

2. Make sure you are in the `backend` directory, otherwise go into the backend directory of the project:

   ```bash
   cd ./backend
   ```

3. Run Docker compose. Your local development and test databases should be ready after the docker compose process is complete.

   ```bash
   docker-compose up
   ```

## Running the API

### Development environment

1. **Run the API**: You can start the server in development mode using:

   ```bash
   npx ts-node src/index.ts
   ```

   This will start the server with `ts-node`, allowing you to run TypeScript files directly.

### Production environment

1. **Compile TypeScript**: If you want to compile TypeScript manually, run:

   ```bash
   npm run build
   ```

   This will compile the TypeScript files into JavaScript in the `dist` directory.

2. **For Production**: If you want to run the compiled JavaScript files, use:

   ```bash
   npm start
   ```

   This will run the server using the compiled files in the `dist` directory.

## API Endpoints

### Upload a CSV File

- **POST** `/api/upload`
- **Description**: Upload a CSV file to insert posts into the database.
- **Request Body**: Form-data with a file field named `file`.

### Get Posts

- **GET** `/api/posts`
- **Description**: Retrieve a list of posts with optional pagination.
- **Query Parameters**:
  - `limit`: Number of posts to return (default: 10).
  - `offset`: Number of posts to skip (default: 0).

## Running Unit Tests

1. Ensure that you have a Postgresql database set up for testing, as described in the [database section](#running-database-in-docker). For convenience, a Docker compose file is available in `backend/docker-compose.yml`. Your test database should be ready after the docker compose process is complete.

   ```bash
   cd ./backend
   docker-compose up
   ```

2. **Run tests**: Run unit tests by using the command:

   ```bash
   npx jest
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
