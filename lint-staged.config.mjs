// @ts-check
import { $ } from 'zx';

/** @type {Array<{ name: string; path: string }>} */
const workspacePackagesInclRoot = JSON.parse(
  (await $`pnpm --recursive list --json --depth -1`).stdout,
);
const workspacePackages = workspacePackagesInclRoot.slice(1);

/**
 *
 * @param {string[]} files
 */
function computeEslintShellCommandsPerPackage(files) {
  /** @type {{ [nameOfPackage: string]: string[] }} */
  const sourceFilesPartitionedByPackage = {};

  for (const { name: nameOfPackage } of workspacePackages) {
    sourceFilesPartitionedByPackage[nameOfPackage] = [];
  }

  for (const file of files) {
    let foundPackage = false;
    for (const { name: nameOfPackage, path: pathOfPackage } of workspacePackages) {
      if (file.startsWith(pathOfPackage)) {
        sourceFilesPartitionedByPackage[nameOfPackage].push(file);
        foundPackage = true;
        break;
      }
    }
  }

  /** @type {string[]} */
  const eslintCommandsToExecute = [];
  for (const partition of Object.entries(sourceFilesPartitionedByPackage)) {
    const [nameOfPackage, filesList] = partition;
    if (filesList.length < 1) {
      continue;
    }
    eslintCommandsToExecute.push(
      `pnpm --filter "${nameOfPackage}" run pkg:lint:file ${filesList
        .map((file) => `"${file}"`)
        .join(' ')}`,
    );
  }

  return eslintCommandsToExecute;
}

export default {
  /**
   * @param {string[]} files
   */
  '**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': (files) => {
    return [
      `pnpm run w:compile:dry-run`,
      ...computeEslintShellCommandsPerPackage(files),
      `prettier --write --ignore-unknown ${files.map((file) => `"${file}"`).join(' ')}`,
    ];
  },
  '**/*.!({js,jsx,mjs,cjs,ts,tsx,mts,cts})': ['prettier --write --ignore-unknown'],
  'apps/web/src/writing/**':
    'pnpm --dir ./apps/web run fetch-favicons && pnpm --dir ./apps/web run generate-css-modules',
};
