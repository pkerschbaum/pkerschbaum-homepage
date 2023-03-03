import { default as fetch, type Response } from 'node-fetch';

export const binaryUtils = {
  fetchUrl,
  convertBlobToDataURL,
};

async function fetchUrl(url: URL): Promise<Response> {
  let attempts = 1;
  let response;
  while (attempts <= 3 && !response) {
    try {
      response = await fetch(url.href);
    } catch {
      // ignore
    }
    attempts++;
  }

  if (!response?.ok || !`${response.status}`.startsWith('2')) {
    throw new Error(`could not fetch`);
  }

  return response;
}

async function convertBlobToDataURL(blob: Blob): Promise<string> {
  const buffer = Buffer.from(await blob.arrayBuffer());
  return `data:${blob.type};base64,${buffer.toString('base64')}`;
}
