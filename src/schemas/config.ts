import { z } from 'zod';
import { cryVersionSchema } from './cryVersion';
import { generationSchema } from './generation';

export const configSchema = z.object({
  generation: generationSchema,
  cryVersion: cryVersionSchema,
});

export type GameConfig = z.infer<typeof configSchema>;
