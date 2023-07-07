import { schema_faviconsForWebsites } from '@pkerschbaum/fetch-favicon';
import fs from 'fs';

import { PATHS } from '#pkg/constants-server.js';
import type { MDXParseResult } from '#pkg/mdx/index.js';

type IconURLToAssociatedWebsitesMap = {
  [iconURL in string]?: {
    iconDataURL: string;
    associatedWebsites: string[];
  };
};
export type FaviconDataURLsForWebsiteURLs = {
  lightIcons: IconURLToAssociatedWebsitesMap;
  darkIcons: IconURLToAssociatedWebsitesMap;
};

const faviconsForWebsitesReadPromise = fs.promises.readFile(PATHS.FAVICONS_FOR_WEBSITES, {
  encoding: 'utf8',
});

export async function createFaviconsMapping(
  mdxParseResult: MDXParseResult,
): Promise<FaviconDataURLsForWebsiteURLs> {
  const faviconsForWebsitesString = await faviconsForWebsitesReadPromise;
  const faviconsForWebsites = schema_faviconsForWebsites.parse(
    JSON.parse(faviconsForWebsitesString),
  );

  const faviconDataURLsForWebsiteURLs: FaviconDataURLsForWebsiteURLs = {
    lightIcons: {},
    darkIcons: {},
  };
  for (const collectedHref of mdxParseResult.collectedHrefs) {
    const iconURLs = faviconsForWebsites.websites[collectedHref]?.iconURLs;

    let lightIconDataURL;
    if (iconURLs?.light) {
      lightIconDataURL = faviconsForWebsites.icons[iconURLs.light]?.dataURL;

      if (lightIconDataURL) {
        let matching = faviconDataURLsForWebsiteURLs.lightIcons[iconURLs.light];
        if (!matching) {
          matching = { iconDataURL: lightIconDataURL, associatedWebsites: [] };
          faviconDataURLsForWebsiteURLs.lightIcons[iconURLs.light] = matching;
        }
        matching.associatedWebsites.push(collectedHref);
      }
    }

    if (iconURLs?.dark) {
      const darkIconDataURL = faviconsForWebsites.icons[iconURLs.dark]?.dataURL;

      if (darkIconDataURL && darkIconDataURL !== lightIconDataURL) {
        let matching = faviconDataURLsForWebsiteURLs.darkIcons[iconURLs.dark];
        if (!matching) {
          matching = { iconDataURL: darkIconDataURL, associatedWebsites: [] };
          faviconDataURLsForWebsiteURLs.darkIcons[iconURLs.dark] = matching;
        }
        matching.associatedWebsites.push(collectedHref);
      }
    }
  }
  return faviconDataURLsForWebsiteURLs;
}
