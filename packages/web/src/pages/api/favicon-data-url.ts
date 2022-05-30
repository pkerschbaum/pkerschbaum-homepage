import type { NextApiRequest, NextApiResponse } from 'next';

import { logger } from '~/logger';
import { fetchFaviconDataURL } from '~/operations/favicon.server';
import type { FaviconDataUrls } from '~/schema';

async function handleRequest(req: NextApiRequest): Promise<FaviconDataUrls> {
  const urlToFetchFrom = req.query.url;

  if (typeof urlToFetchFrom !== 'string') {
    throw new Error(`invalid argument`);
  }

  return await fetchFaviconDataURL(urlToFetchFrom);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const responseData = await handleRequest(req);
    res.status(200).json(responseData);
  } catch (err) {
    logger.error('error occured', err);
    res.status(500).send(null);
  }
}
