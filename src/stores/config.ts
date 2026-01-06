import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type CryVersion, CryVersions } from '../schemas/cryVersion';
import { type Generation, Generations } from '../schemas/generation';

type GameConfigStore = {
  generation: Generation;
  setGeneration: (generation: Generation) => void;
  cryVersion: CryVersion;
  setCryVersion: (cryVersion: CryVersion) => void;
  clearConfig: () => void;
};

export const useConfigStore = create<GameConfigStore>()(
  persist(
    (set) => ({
      generation: Generations.I,
      setGeneration: (generation) => set({ generation }),
      cryVersion: CryVersions.LEGACY,
      setCryVersion: (cryVersion) => set({ cryVersion }),
      clearConfig: () =>
        set({ generation: Generations.I, cryVersion: CryVersions.LEGACY }),
    }),
    { name: 'config' },
  ),
);
