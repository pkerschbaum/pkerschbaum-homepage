import { usePathname } from 'next/navigation.js';

import { config } from '#pkg/config.js';

export function usePageUrl() {
  const pathname = usePathname();
  return new URL(pathname, config.deploymentOrigin);
}
