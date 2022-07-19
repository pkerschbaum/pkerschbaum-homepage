// @ts-expect-error -- types of "safe-stable-stringify" do not work with "module" set to "node16" in tsconfig.json
import safeStringify from 'safe-stable-stringify';

export const jsonUtil = {
  safeStringify: safeStringify as typeof JSON.stringify,
};
