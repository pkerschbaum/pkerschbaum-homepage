import { usePathname } from 'next/navigation';

import { config } from '#pkg/config';

export function usePageUrl() {
  const pathname = usePathname();
  return new URL(pathname, config.deploymentOrigin);
}
