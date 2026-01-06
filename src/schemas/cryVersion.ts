import { z } from 'zod';

const CRY_VERSIONS = ['legacy', 'latest'] as const;

export const CryVersions = {
  LATEST: 'latest',
  LEGACY: 'legacy',
} as const satisfies Record<string, (typeof CRY_VERSIONS)[number]>;

export const cryVersionSchema = z.enum(CRY_VERSIONS);

export type CryVersion = z.infer<typeof cryVersionSchema>;
