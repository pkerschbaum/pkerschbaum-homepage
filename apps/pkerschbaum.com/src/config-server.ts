/* eslint-disable n/no-process-env -- configs are the only place where reading from process.env is allowed */
import 'server-only';

export const configServer = {
  neonDatabaseUrl: process.env.DATABASE_URL,
};
