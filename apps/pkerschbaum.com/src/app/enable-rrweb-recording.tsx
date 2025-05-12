'use client';

import { record } from '@sentry-internal/rrweb';
import React from 'react';
import invariant from 'tiny-invariant';

import { config } from '#pkg/config.js';
import { storeRRWebEvents } from '#pkg/server-actions/store-rrweb-events.js';

const BATCH_INTERVAL_MS = 5000;

const sessionId = config.isServer ? undefined : self.crypto.randomUUID();

export const EnableRRWebRecording: React.FC = () => {
  React.useEffect(() => {
    if (config.isServer) {
      return;
    }

    let eventsBatch: unknown[] = [];

    function sendBatch() {
      invariant(sessionId);
      void storeRRWebEvents(sessionId, eventsBatch);
      eventsBatch = [];
    }

    const intervalId = setInterval(sendBatch, BATCH_INTERVAL_MS);

    const handleBeforeUnload = () => {
      sendBatch();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendBatch();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const stopRecording = record({
      emit: (event) => {
        eventsBatch.push(event);
      },
    });

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      sendBatch();
      if (stopRecording) {
        stopRecording();
      }
    };
  }, []);

  return null;
};
