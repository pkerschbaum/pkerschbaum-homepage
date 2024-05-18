import { config } from '#pkg/config.js';

export async function register() {
  if (config.nextRuntime === 'nodejs') {
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await import('../sentry.server.config.js');
  }

  if (config.nextRuntime === 'edge') {
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await import('../sentry.edge.config.js');
  }
}
