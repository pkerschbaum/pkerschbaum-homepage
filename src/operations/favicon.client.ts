import { schema_faviconDataUrls } from '~/schema';

export async function fetchFaviconDataURL(href: string) {
  const response = await fetch(`/api/favicon-data-url?url=${href}`);
  const parsedResponseBody = schema_faviconDataUrls.parse(await response.json());
  return parsedResponseBody;
}
