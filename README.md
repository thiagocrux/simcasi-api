# SIMCASI (API)

API for SIMCASI (which stands for Sistema de Monitoramento de Casos de Sífilis), an app designed to monitor syphilis cases.

## Technologies

These are some of the technologies used in this project:

- `@commitlint/cli` & `@commitlint/config-conventional`: Tools to check commit messages and ensure consistency in version control.
- `eslint`: A linting tool for JavaScript/TypeScript code.
- `husky`: A tool for adding Git hooks to automate tasks like linting, testing, or commits in JavaScript/Node.js projects.
- `lint-staged`: Runs linters on Git staged files.
- `pino` & `pino-pretty`: Fast logging libraries for Node.js.
- `prettier`: A code formatter.
- `supertest`: HTTP assertions for integration testing.
- `tsx`: TypeScript execution environment for Node.js.
- `typescript`: A superset of JavaScript that introduces optional static typing, interfaces, enums, and other language features.
- `vitest`: A blazing fast unit test framework.
- `bcryptjs`: Library to hash passwords.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `jsonwebtoken`: Implementation of JSON Web Tokens.
- `mongoose`: Elegant MongoDB object modeling for Node.js.
- `zod`: TypeScript-first schema validation with static type inference.

_For more information about other dependencies, see the [`package.json`](package.json) file._

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thiagocrux/simcasi-api.git
   ```

2. Navigate to the project folder:

   ```bash
   cd simcasi-api
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Configure your environment variables:

   4. Configure your environment variables:

   - The project uses environment variable files for configuration.
   - You should create the following files in the project root, based on your environment:
     - `.env.development.test`
     - `.env.production.test`
     - `.env.test.local`
   - You can also refer to the `.env.example` file provided in the project root.
   - Each environment file should contain the following variables.
     Leave the values blank and follow the comments to avoid mistakes:

     ```env
     # Set the application environment (e.g., development, production, test)
     NODE_ENV=
     # Hostname where the app will run (e.g., localhost)
     APP_HOSTNAME=
     # Port number for the application (e.g., 3001)
     APP_PORT=
     # MongoDB connection string (e.g., mongodb://localhost:27018/your_mongodb_database)
     DATABASE_URL=
     # Secret key for JWT authentication (use a long, random string)
     JWT_SECRET=
     ```

## Available scripts

This section describes the available scripts in the [`package.json`](package.json) file and their functionalities.

### Development

- #### `dev`

  Starts the server in development mode, enabling faster builds and live-reloading.

  ```bash
  pnpm dev
  ```

### Production

- #### `build`

  Compiles the application for production.

  ```bash
  pnpm build
  ```

- #### `start`

  Runs the compiled application in production mode.

  ```bash
  pnpm start
  ```

### Testing

- #### `test`

  Runs all unit and integration tests.

  ```bash
  pnpm test
  ```

- #### `test:watch`

  Runs tests in watch mode.

  ```bash
  pnpm test:watch
  ```

- #### `test:coverage`

  Runs tests and generates a coverage report.

  ```bash
  pnpm test:coverage
  ```

## License

MIT License

Copyright (c) 2025 Thiago Luiz da Cruz Souza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
