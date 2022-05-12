module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) =>
    `npm run lint --file ${filenames.map((file) => file.split(process.cwd())[1]).join(' --file ')}`,
  '**/*': ['prettier --write --ignore-unknown'],
};
