import { default as fetch } from 'node-fetch';

export const binaryUtils = { fetchUrlAndConvertToDataURL };

async function fetchUrlAndConvertToDataURL(url: URL): Promise<string> {
  const response = await fetch(url.href);
  if (!response.ok || !`${response.status}`.startsWith('2')) {
    throw new Error(`could not fetch`);
  }
  const blob = await response.blob();
  return await convertBlobToDataURL(blob);
}

async function convertBlobToDataURL(blob: Blob): Promise<string> {
  const buffer = Buffer.from(await blob.arrayBuffer());
  return `data:${blob.type};base64,${buffer.toString('base64')}`;
}
