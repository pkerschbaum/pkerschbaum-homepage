/* eslint-disable no-console -- using console for logging is allowed here */

export const logger = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
};
