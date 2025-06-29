import { Button } from '@headlessui/react';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { usePokemonCryAndAnswerStore } from '../../stores/pokemonCryAndAnswer';

export const QuizResult = () => {
  const navigate = useNavigate();
  const { pokemonCryAndAnswers } = usePokemonCryAndAnswerStore();

  const correctCount = pokemonCryAndAnswers.filter(
    (p) => p.name.toLowerCase() === p.answer.toLowerCase(),
  ).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-center font-bold text-3xl text-gray-900 dark:text-gray-100">
        結果発表
      </h1>
      <p className="mb-8 text-center text-gray-800 text-lg dark:text-gray-200">
        正解数:{' '}
        <span className="font-bold text-green-600 dark:text-green-400">
          {correctCount}
        </span>{' '}
        / {pokemonCryAndAnswers.length}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pokemonCryAndAnswers.map((p, i) => {
          const isCorrect = p.name.toLowerCase() === p.answer.toLowerCase();
          const icon = isCorrect ? (
            <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
          ) : (
            <XCircleIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
          );

          return (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                alt={p.name}
                className="h-16 w-16"
              />
              <div className="flex-1 text-gray-900 dark:text-gray-100">
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  第{i + 1}問
                </p>
                <p className="font-semibold">正解: {p.name}</p>
                <p>あなたの答え: {p.answer}</p>
              </div>
              <div>{icon}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          onClick={() => navigate('/quiz')}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-700 dark:hover:bg-teal-800"
        >
          <ArrowPathIcon className="h-5 w-5" />
          もう一回チャレンジ！
        </Button>
      </div>
    </div>
  );
};
