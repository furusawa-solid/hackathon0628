import { z } from 'zod';

const GENERATION_VALUES = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;

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
} as const satisfies Record<string, (typeof GENERATION_VALUES)[number]>;

export const generationSchema = z.enum(GENERATION_VALUES);

export type Generation = z.infer<typeof generationSchema>;
