import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PokemonCryAndAnswer } from '../schemas/pokemon';

type PokemonCryAndAnswerStore = {
  pokemonCryAndAnswers: PokemonCryAndAnswer[];
  addPokemonCryAndAnswer: (pokemonCryAndAnswer: PokemonCryAndAnswer) => void;
  clearPokemonCryAndAnswer: () => void;
};

export const usePokemonCryAndAnswerStore = create<PokemonCryAndAnswerStore>()(
  persist(
    (set) => ({
      pokemonCryAndAnswers: [],
      addPokemonCryAndAnswer: (pokemonCryAndAnswer) =>
        set((state) => ({
          pokemonCryAndAnswers: [
            ...state.pokemonCryAndAnswers,
            pokemonCryAndAnswer,
          ],
        })),
      clearPokemonCryAndAnswer: () => set({ pokemonCryAndAnswers: [] }),
    }),
    { name: 'pokemon-cry-and-answers' },
  ),
);
