# pkerschbaum.com <!-- omit in toc -->

- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Build & Run](#build--run)
  - [Additional commands for development](#additional-commands-for-development)

## Development

### Prerequisites

- Follow the "Prerequisites" installation guide of [microsoft/vscode/wiki/How-to-Contribute#prerequisites](https://github.com/microsoft/vscode/wiki/How-to-Contribute#prerequisites).
  - For the NodeJS version to use, please refer to the file [.nvmrc](./.nvmrc) of this project. This is the version of NodeJS the project should be developed with.  
    It is recommended to use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use`, this will automatically switch to the NodeJS version mentioned in `.nvmrc`.
- This monorepo uses [`pnpm`](https://pnpm.io/) as package manager.  
  For installation instructions see [pnpm.io/installation](https://pnpm.io/installation); it should boil down to this command:

  ```sh
  npm i -g pnpm
  ```

### Build & Run

1. **Install all dependencies:**

   ```sh
   pnpm install
   ```

1. **Run an initial build:**

   ```sh
   pnpm run mr:build
   ```

   > **Note:** This command will also run Puppeteer (as part of the build of @pkerschbaum-homepage/fetch-favicon).
   > If you have some errors with Puppeteer, like "error while loading shared libraries: libatk-1.0.so.0", make sure you have installed all dependencies on your system necessary to run Puppeteer/Chrome.  
   > See also <https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md>.

1. **Start a local instance of `@pkerschbaum-homepage/web`:**

   ```sh
   cd ./packages/apps/web
   pnpm run dev
   ```

### Additional commands for development

See `scripts` of [`./package.json`](./package.json) for available monorepo scripts.
