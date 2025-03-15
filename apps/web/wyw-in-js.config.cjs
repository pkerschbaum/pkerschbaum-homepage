// @ts-check
module.exports = {
  /**
   * https://github.com/callstack/linaria/blob/master/docs/CONFIGURATION.md
   *
   * @param {string} hash
   * @param {string} title
   * @param {{ name: string; hash: string; dir: string; ext: string; file: string; name: string; }} args
   * @returns
   */
  classNameSlug: (hash, title, args) =>
    process.env.NODE_ENV === 'production' ? hash : `${args.name}_${title}_${hash}`,
};
