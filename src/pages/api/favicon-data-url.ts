import type { NextApiRequest, NextApiResponse } from 'next';

import { logger } from '~/logger';
import { fetchFaviconDataURL } from '~/operations/favicon';
import type { FaviconDataUrlResponse } from '~/schema';

async function handleRequest(req: NextApiRequest): Promise<FaviconDataUrlResponse> {
  const urlToFetchFrom = req.query.url;

  if (typeof urlToFetchFrom !== 'string') {
    throw new Error(`invalid argument`);
  }

  const dataURL = await fetchFaviconDataURL(urlToFetchFrom);

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
