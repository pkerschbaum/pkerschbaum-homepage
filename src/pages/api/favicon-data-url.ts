import type { NextApiRequest, NextApiResponse } from 'next';

import { logger } from '~/logger';
import type { FaviconDataUrlResponse } from '~/schema';
import { binaryUtils } from '~/utils/binary.utils';

async function handleRequest(req: NextApiRequest): Promise<FaviconDataUrlResponse> {
  const urlToFetchFrom = req.query.url;

  if (typeof urlToFetchFrom !== 'string') {
    throw new Error(`invalid argument`);
  }

  const dataURL = await binaryUtils.fetchUrlAndConvertToDataURL(
    `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
      urlToFetchFrom,
    )}&size=64`,
  );

  return { dataURL };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const responseData = await handleRequest(req);
    res.status(200).json({ dataURL: responseData.dataURL });
  } catch (err) {
    logger.error('error occured', err);
    res.status(500).send(null);
  }
}
