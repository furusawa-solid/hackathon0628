import { z } from 'zod';

export const CryVersions = {
  LATEST: 'latest',
  LEGACY: 'legacy',
} as const;

export const cryVersionsSchema = z.enum(
  Object.values(CryVersions) as [string, ...string[]],
);

export type CryVersion = z.infer<typeof cryVersionsSchema>;
