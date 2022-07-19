// @ts-check
const { execSync } = require('child_process');

/** @type {Array<{ name: string; path: string }>} */
const workspacePackagesInclRoot = JSON.parse(
  execSync('pnpm --recursive list --json --depth -1').toString('utf-8'),
);
const workspacePackages = workspacePackagesInclRoot.slice(1);

/**
 *
 * @param {string[]} files
 */
function computeEslintShellCommandsPerPackage(files) {
  /** @type {string[]} */
  const sourceFilesOutsidePackages = [];
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
    if (!foundPackage) {
      sourceFilesOutsidePackages.push(file);
    }
  }

  /** @type {string[]} */
  const eslintCommandsToExecute = [];
  if (sourceFilesOutsidePackages.length > 0) {
    eslintCommandsToExecute.push(
      `pnpm exec eslint --max-warnings 0 ${sourceFilesOutsidePackages
        .map((file) => `"${file}"`)
        .join(' ')}`,
    );
  }
  for (const partition of Object.entries(sourceFilesPartitionedByPackage)) {
    const [nameOfPackage, filesList] = partition;
    if (filesList.length < 1) {
      continue;
    }
    eslintCommandsToExecute.push(
      `pnpm --filter "${nameOfPackage}" run lint ${filesList.map((file) => `"${file}"`).join(' ')}`,
    );
  }

  return eslintCommandsToExecute;
}

module.exports = {
  /**
   * @param {string[]} files
   */
  '**/*.{js,jsx}': (files) => {
    return [
      ...computeEslintShellCommandsPerPackage(files),
      `prettier --write --ignore-unknown ${files.map((file) => `"${file}"`).join(' ')}`,
    ];
  },
  /**
   * @param {string[]} files
   */
  '**/*.{ts,tsx}': (files) => {
    return [
      `pnpm run mr:compile`,
      ...computeEslintShellCommandsPerPackage(files),
      `prettier --write --ignore-unknown ${files.map((file) => `"${file}"`).join(' ')}`,
    ];
  },
  '**/*.!({js,jsx,ts,tsx})': ['prettier --write --ignore-unknown'],
};
