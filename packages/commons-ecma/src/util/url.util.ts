import { check } from '@pkerschbaum/ts-utils';

export const urlUtils = { createReadableTextFromUrl, generateUrlFragmentFromText };

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

/**
 * https://tomekdev.com/posts/anchors-for-headings-in-mdx#override-heading-component
 */
function generateUrlFragmentFromText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\d a-z]/g, '')
    .replace(/ /g, '-');
}
