import { check } from '@pkerschbaum/ts-utils';

export const urlUtils = { createReadableTextFromUrl };

function createReadableTextFromUrl(url: URL): string {
  let generatedText = url.host;
  if (check.isNonEmptyString(url.port)) {
    generatedText += `:${url.port}`;
  }
  generatedText += url.pathname;
  if (check.isNonEmptyString(url.search)) {
    generatedText += url.search;
  }
  if (check.isNonEmptyString(url.hash)) {
    generatedText += url.hash;
  }

  return generatedText;
}
