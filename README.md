# pkerschbaum.com <!-- omit in toc -->

- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Build & Run](#build--run)
  - [Additional commands for development](#additional-commands-for-development)

## Development

### Prerequisites

- Follow the "Prerequisites" installation guide of [microsoft/vscode/wiki/How-to-Contribute#prerequisites](https://github.com/microsoft/vscode/wiki/How-to-Contribute#prerequisites).
  - You can skip the installation of `yarn`, it is not needed for this repository.
  - For the NodeJS version to use, please refer to the file [.nvmrc](./.nvmrc) of this project. This is the version of NodeJS the project should be developed with.  
    It is recommended to use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use`, this will automatically switch to the NodeJS version mentioned in `.nvmrc`.
- This monorepo ("workspace") uses [`pnpm`](https://pnpm.io/) as package manager.  
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
   pnpm run w:build
   ```

   > **Note:** This command will also run Puppeteer.  
   > If you have some errors with Puppeteer, like "error while loading shared libraries: libatk-1.0.so.0", make sure you have installed all dependencies on your system necessary to run Puppeteer/Chrome.  
   > One way to get all dependencies is to just install Chrome. For Ubuntu, execute this command in a temporary directory:  
   > `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo apt install ./google-chrome-stable_current_amd64.deb`  
   > See also this link for more information: <https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md>.

1. **Run watcher for the libraries:**

   ```sh
   pnpm w:libs:watch
   ```

1. **Start a local instance of `@pkerschbaum-homepage/web`:**

   ```sh
   cd ./packages/apps/web
   pnpm run dev
   ```

### Additional commands for development

See `scripts` of [`./package.json`](./package.json) for available scripts in the workspace.
