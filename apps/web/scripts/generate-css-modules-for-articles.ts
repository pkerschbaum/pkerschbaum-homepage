import fs from 'fs';
import path from 'path';
import invariant from 'tiny-invariant';

import { PATHS, Classes, DataAttribute, ColorTheme, ClassesAliases } from '#pkg/constants.js';
import { createFaviconsMapping } from '#pkg/favicons/favicons.js';
import { parseMDXFileAndCollectHrefs } from '#pkg/mdx/mdx.js';

/* 
  Generate .module.css files for every blog post & tidbit page containing icons for FancyAnchors.
  We construct CSS such that we transmit every data URL only once and apply it to the associated
  FancyAnchors via attribute selectors.

  Idea of those FancyAnchor's is based on https://twitter.com/simevidas/status/1481753210578690064.

  @example
  .favicons .fancy-anchor[href="https://playwright.dev/docs/test-fixtures"]::before,
  .favicons .fancy-anchor[href="https://playwright.dev/docs/test-advanced#projects"]::before,
  .favicons .fancy-anchor[href="https://playwright.dev/docs/test-components#planned-work"]::before {
    display: inline-block;
    background-image: url(DATA_URL_OF_PLAYWRIGHT_FAVICON);
  }
*/
async function generateCssModulesForArticles() {
  const [postsBasenames, tidbitsBasenames] = await Promise.all([
    fs.promises.readdir(PATHS.POSTS),
    fs.promises.readdir(PATHS.TIDBITS),
  ]);

  await Promise.all([
    ...postsBasenames.map(async (postBasename) => {
      const nameWithoutExt = path.parse(postBasename).name;
      const cssModule = await generateCssModuleForPage(PATHS.POSTS, nameWithoutExt);
      await fs.promises.writeFile(
        path.join(PATHS.POSTS_PAGES_DIR, nameWithoutExt, `styles.module.css`),
        cssModule,
        { encoding: 'utf8' },
      );
    }),
    ...tidbitsBasenames.map(async (tidbitBasename) => {
      const nameWithoutExt = path.parse(tidbitBasename).name;
      const cssModule = await generateCssModuleForPage(PATHS.TIDBITS, nameWithoutExt);
      await fs.promises.writeFile(
        path.join(PATHS.TIDBITS_PAGES_DIR, nameWithoutExt, `styles.module.css`),
        cssModule,
        { encoding: 'utf8' },
      );
    }),
  ]);
}

async function generateCssModuleForPage(
  absolutePathToSourceDirectory: string,
  nameWithoutExt: string,
) {
  const { faviconDataURLsForWebsiteURLs } = await fetchMDXFileAndFavicons(
    absolutePathToSourceDirectory,
    nameWithoutExt,
  );

  const lightIconsCss = Object.values(faviconDataURLsForWebsiteURLs.lightIcons).map((icon) => {
    invariant(icon);
    const selector = icon.associatedWebsites
      .map(
        (url) =>
          `.${ClassesAliases.FAVICONS} :global(.${Classes.STYLED_ANCHOR})[href="${url}"] > span:first-of-type::before`,
      )
      .join(', ');
    const rule = `{ display: inline-block; background-image: url(${icon.iconDataURL}); }`;
    return `${selector} ${rule}`;
  });

  const darkIconsCss = Object.values(faviconDataURLsForWebsiteURLs.darkIcons).map((icon) => {
    invariant(icon);
    const selector = icon.associatedWebsites
      .map(
        (url) =>
          `*:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] .${ClassesAliases.FAVICONS} :global(.${Classes.STYLED_ANCHOR})[href="${url}"] > span:first-of-type::before`,
      )
      .join(', ');
    const rule = `{ display: inline-block; background-image: url(${icon.iconDataURL}); }`;
    return `${selector} ${rule}`;
  });

  const css = `${lightIconsCss.join(' ')} ${darkIconsCss.join(' ')}`;

  return css;
}

async function fetchMDXFileAndFavicons(absolutePathToDirectory: string, segment: string) {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(absolutePathToDirectory, `${segment}.mdx`),
  );

  const faviconDataURLsForWebsiteURLs = await createFaviconsMapping(mdxParseResult);

  return {
    mdxParseResult,
    faviconDataURLsForWebsiteURLs,
  };
}

void generateCssModulesForArticles();
