import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IconButton } from '../../components/ui/IconButton';
import { Input } from '../../components/ui/Input';
import { LabelButton } from '../../components/ui/LabelButton';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../components/ui/Heading';
import {
  type PokemonCryAnswerForm,
  pokemonCryAnswerFormSchema,
} from '../../schemas/pokemon';
import { usePokemonCryAndAnswerStore } from '../../stores/pokemonCryAndAnswer';
import { playCry } from '../../utils/audio';
import { useRandomPokemonCries } from '../../utils/usePokemon';

export const PokemonCryQuizForm = () => {
  const navigate = useNavigate();
  const { addPokemonCryAndAnswer, clearPokemonCryAndAnswer } =
    usePokemonCryAndAnswerStore();
  const [quizNumber, setQuizNumber] = useState<number>(0);
  const pokemons = useRandomPokemonCries();
  console.log(pokemons);

  // 初回表示のタイミングで回答とポケモンをリセット
  useEffect(() => {
    clearPokemonCryAndAnswer();
  }, [clearPokemonCryAndAnswer]);

  // 全て回答したら結果へ
  useEffect(() => {
    if (pokemons?.length === quizNumber) {
      navigate('/result');
    }
  }, [navigate, pokemons, quizNumber]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PokemonCryAnswerForm>({
    resolver: zodResolver(pokemonCryAnswerFormSchema),
  });

  const onSubmit = (form: PokemonCryAnswerForm) => {
    addPokemonCryAndAnswer({
      ...pokemons[quizNumber],
      answer: form.answer,
    });
    setQuizNumber((prev) => prev + 1);
    reset();
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-y-3 rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-lg">
      <Heading level={3} className="font-bold text-xl text-yellow-400">
        第{quizNumber + 1}問
      </Heading>
      <p>この鳴き声のポケモンの名前は？</p>
      <div className="flex justify-center">
        <IconButton
          label="再生する"
          icon={faPlay}
          onClick={() => playCry(pokemons[quizNumber].cryUrl)}
          className="flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-sm text-white transition"
        />
      </div>
      {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
      <Input
        register={register('answer')}
        inputProps={{ placeholder: 'ポケモンの名前を入力' }}
        className="w-full bg-gray-700 px-4 py-2 text-gray-100 placeholder-gray-400"
      />
      <LabelButton
        label="このポケモンに決めた！"
        onClick={handleSubmit(onSubmit)}
        className="w-full py-2 font-semibold text-white transition"
      />
    </div>
  );
};
