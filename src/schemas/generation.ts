import { z } from 'zod';

export const Generations = {
  I: '1',
  II: '2',
  III: '3',
  IV: '4',
  V: '5',
  VI: '6',
  VII: '7',
  VIII: '8',
  IX: '9',
} as const;

export const generationsSchema = z.enum(
  Object.values(Generations) as [string, ...string[]],
);

export type Generation = z.infer<typeof generationsSchema>;
