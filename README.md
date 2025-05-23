# pkerschbaum.com <!-- omit in toc -->

- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Code Organization](#code-organization)
  - [Build \& Run](#build--run)
  - [Additional commands for development](#additional-commands-for-development)

## Development

### Prerequisites

- **Node.js:** It is recommended to use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use`, this will automatically switch to the Node.js version mentioned in the file [`.nvmrc`](./.nvmrc).  
   Alternatively you can install Node.js directly, please refer to `.nvmrc` of this project to determine the Node.js version to use.
- **pnpm:** This monorepo ("workspace") uses [`pnpm`](https://pnpm.io/) as package manager.  
  It is recommended to use `corepack` of Node.js, just run:

  ```sh
  corepack enable
  ```

  `pnpm` commands should now be available (and the `pnpm` version specified in `package.json#packageManager` will be automatically used).

- **Toolchain for native Node.js modules:** Run the installation instructions "A C/C++ compiler tool chain for your platform" of [microsoft/vscode/wiki/How-to-Contribute#prerequisites](https://github.com/microsoft/vscode/wiki/How-to-Contribute#prerequisites).

### Code Organization

- [`./apps/pkerschbaum.com`](./apps/pkerschbaum.com): the homepage
- [`./packages`](./packages): libraries
- [`./platform`](./platform): configurations and tools for the monorepo

### Build & Run

1. **Install all dependencies:**

   ```sh
   pnpm install
   ```

1. **Run an initial build:**

   ```sh
   pnpm run build
   ```

1. **Run watcher for the libraries:**

   ```sh
   pnpm dev
   ```

1. **Start a local instance of `@pkerschbaum-homepage/web`:**

   ```sh
   pnpm --filter=web run dev
   ```

### Additional commands for development

See `scripts` of [`./package.json`](./package.json) for available scripts in the workspace.

To fetch the favicons for all articles, run `internal:fetch-favicons` and `internal:generate-css-modules` in [`./apps/pkerschbaum.com`](./apps/pkerschbaum.com).

> **Note:** This command will also run Puppeteer.  
> If you have some errors with Puppeteer, like "error while loading shared libraries: libatk-1.0.so.0", make sure you have installed all dependencies on your system necessary to run Puppeteer/Chrome.  
> One way to get all dependencies is to just install Chrome. For Ubuntu, execute this command in a temporary directory:  
> `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && sudo apt install ./google-chrome-stable_current_amd64.deb`  
> See also this link for more information: <https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md>.
