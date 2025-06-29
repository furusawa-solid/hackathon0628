import { Pokedex } from 'pokeapi-js-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PokemonCryAndAnswer } from '../schemas/pokemon';
import { getRandomItems } from './array';

const P = new Pokedex();

export const useRandomPokemonCries = () => {
  const [pokemons, setPokemons] = useState<PokemonCryAndAnswer[]>();

  // クエリパラメータで世代を受け取る
  const [searchParams] = useSearchParams();
  const generationParam = Number(searchParams.get('generation'));
  // 数字に変換 & バリデーション
  const generation =
    Number.isInteger(generationParam) &&
    generationParam >= 1 &&
    generationParam <= 9
      ? generationParam
      : 1;

  const fetchPokemon = useCallback(async () => {
    try {
      // 指定した世代のポケモンを取得
      const { pokemon_species: firstGenerationPokemons } =
        await P.getGenerationByName(generation);

      // ランダムに10匹選出
      const randomPokemons = await Promise.all(
        getRandomItems(firstGenerationPokemons, 10).map(({ name }) =>
          P.getPokemonByName(name),
        ),
      );

      // 日本語名の取得 & 扱いやすい形にマッピング
      const randomPokemonCryAndAnswers = await Promise.all(
        randomPokemons.map(async (pokemon) => {
          const pokemonJapaneseName = await getJapaneseName(pokemon.name);
          return {
            id: pokemon.id,
            name: pokemonJapaneseName,
            cryUrl:
              // 5世代以降はレガシーバージョンの鳴き声がない
              generation >= 5 ? pokemon.cries.latest : pokemon.cries.legacy,
            answer: '',
          };
        }),
      );

      setPokemons(randomPokemonCryAndAnswers);
    } catch (err) {
      console.error('ポケモンの取得失敗:', err);
    }
  }, [generation]);

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
