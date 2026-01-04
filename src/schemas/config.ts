import { z } from 'zod';
import { cryVersionsSchema } from './cries';
import { generationsSchema } from './generation';

export const configSchema = z.object({
  generation: generationsSchema,
  cryVersion: cryVersionsSchema,
});

export type GameConfig = z.infer<typeof configSchema>;
