import { useQuery } from 'react-query';

import { cacheKeys } from '~/global-cache';
import { fetchFaviconDataURL } from '~/operations/favicon';

export type UseFaviconResult = ReturnType<typeof useFaviconDataURL>;

export function useFaviconDataURL(href: string) {
  return useQuery(cacheKeys.favicon(href), async () => {
    return await fetchFaviconDataURL(href);
  });
}
