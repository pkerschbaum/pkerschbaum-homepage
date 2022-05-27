import { QueryClient } from 'react-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export const cacheKeys = {
  favicon: (href: string) => ['favicon', href],
} as const;
