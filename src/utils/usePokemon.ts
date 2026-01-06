import { Pokedex } from 'pokeapi-js-wrapper';
import { useCallback, useEffect, useState } from 'react';
import type { PokemonCryAndAnswer } from '../schemas/pokemon';
import { useConfigStore } from '../stores/config';
import { getRandomItems } from './array';

const P = new Pokedex();

export const useRandomPokemonCries = () => {
  const [pokemons, setPokemons] = useState<PokemonCryAndAnswer[]>();
  const { generation, cryVersion } = useConfigStore();

  const fetchPokemon = useCallback(async () => {
    try {
      // 指定した世代のポケモンを取得
      // const { pokemon_species: firstGenerationPokemons } =
      const response = await P.getGenerationByName(generation);
      const firstGenerationPokemons = response.pokemon_species;

      // ランダムに10匹選出
      const randomPokemons = await Promise.all(
        getRandomItems(firstGenerationPokemons, 10).map(({ url }) => {
          const pokemonId = url.match(/\/(\d+)\/$/)?.[1] as string;
          return P.getPokemonByName(pokemonId);
        }),
      );

      // 日本語名の取得 & 扱いやすい形にマッピング
      const randomPokemonCryAndAnswers = await Promise.all(
        randomPokemons.map(async (pokemon) => {
          const pokemonJapaneseName = await getJapaneseName(pokemon.name);
          return {
            id: pokemon.id,
            name: pokemonJapaneseName,
            cryUrl: pokemon.cries[cryVersion],
            answer: '',
          };
        }),
      );

      setPokemons(randomPokemonCryAndAnswers);
    } catch (err) {
      console.error('ポケモンの取得失敗:', err);
    }
  }, [generation, cryVersion]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return pokemons as PokemonCryAndAnswer[];
};

const getJapaneseName = async (pokemonName: string) => {
  const species = await P.getPokemonSpeciesByName(pokemonName.toLowerCase());

  const jaName = species.names.find(
    (n) => n.language.name === 'ja-Hrkt', // ← ひらがなカタカナのやつ
  );

  return jaName?.name || '名前不明';
};
