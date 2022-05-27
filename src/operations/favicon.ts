import { config } from '~/config';
import { schema_faviconDataUrlResponse } from '~/schema';
import { binaryUtils } from '~/utils/binary.utils';

export async function fetchFaviconDataURL(href: string) {
  let dataURL;
  if (config.isServer) {
    dataURL = await binaryUtils.fetchUrlAndConvertToDataURL(
      `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
        href,
      )}&size=64`,
    );
  } else {
    const response = await fetch(`/api/favicon-data-url?url=${href}`);
    const body = schema_faviconDataUrlResponse.parse(await response.json());
    dataURL = body.dataURL;
  }

  return dataURL;
}
