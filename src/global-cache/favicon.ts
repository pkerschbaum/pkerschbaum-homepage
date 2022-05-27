import { useQuery } from 'react-query';

import { config } from '~/config';
import { cacheKeys } from '~/global-cache';

export type UseFaviconResult = ReturnType<typeof useFaviconDataURL>;

export function useFaviconDataURL(href: string) {
  return useQuery(cacheKeys.favicon(href), async () => {
    if (config.isServer) {
      const { fetchFaviconDataURL } = await import('~/operations/favicon.server');
      return await fetchFaviconDataURL(href);
    } else {
      const { fetchFaviconDataURL } = await import('~/operations/favicon.client');
      return await fetchFaviconDataURL(href);
    }
  });
}
