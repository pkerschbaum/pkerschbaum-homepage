'use server';

import { neon } from '@neondatabase/serverless';

import { configServer } from '#pkg/config-server.js';

export async function storeRRWebEvents(sessionId: string, events: unknown[]) {
  if (!configServer.neonDatabaseUrl) {
    // ignore
    return;
  }

  const sql = neon(configServer.neonDatabaseUrl);
  for (const event of events) {
    await sql`INSERT INTO rrweb_events (session_id, data) VALUES (${sessionId}, ${JSON.stringify(event)})`;
  }
}
