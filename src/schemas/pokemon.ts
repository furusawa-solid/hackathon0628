import { z } from 'zod';
import { nonWhitespaceString } from '../types/string.schema';

export const pokemonCryAndAnswerSchema = z.object({
  id: z.number(),
  name: z.string(),
  cryUrl: z.string(),
  answer: z.string(),
});
export type PokemonCryAndAnswer = z.infer<typeof pokemonCryAndAnswerSchema>;

export const pokemonCryAnswerFormSchema = z.object({
  answer: nonWhitespaceString,
});
export type PokemonCryAnswerForm = z.infer<typeof pokemonCryAnswerFormSchema>;
