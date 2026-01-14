import { faGear, faPlay, faRedo } from '@fortawesome/free-solid-svg-icons';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../components/ui/IconButton';
import { usePokemonCryAndAnswerStore } from '../../stores/pokemonCryAndAnswer';
import { playCry } from '../../utils/audio';

export const QuizResult = () => {
  const navigate = useNavigate();
  const { pokemonCryAndAnswers } = usePokemonCryAndAnswerStore();

  const correctCount = pokemonCryAndAnswers.filter(
    (p) => p.name.toLowerCase() === p.answer.toLowerCase(),
  ).length;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-y-3 px-4">
      <h1 className="text-center font-bold text-3xl text-gray-100">結果発表</h1>
      <p className="text-center text-gray-200 text-lg">
        正解数: <span className="font-bold text-green-400">{correctCount}</span>{' '}
        / {pokemonCryAndAnswers.length}
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {pokemonCryAndAnswers.map((p, i) => {
          const isCorrect = p.name.toLowerCase() === p.answer.toLowerCase();
          const icon = isCorrect ? (
            <CheckCircleIcon className="h-6 w-6 text-green-400" />
          ) : (
            <XCircleIcon className="h-6 w-6 text-red-400" />
          );

          return (
            <div
              key={p.id}
              className="flex items-center justify-between gap-4 rounded-md border border-gray-700 bg-gray-800 p-4 shadow-md"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                alt={p.name}
                className="h-16 w-16"
              />
              <div className="flex-1 text-gray-100">
                <p className=" text-gray-400 text-sm">第{i + 1}問</p>
                <p className="font-semibold">正解: {p.name}</p>
                <p>あなたの答え: {p.answer}</p>
                <IconButton
                  label="再生する"
                  icon={faPlay}
                  onClick={() => playCry(pokemonCryAndAnswers[i].cryUrl)}
                  className="flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-sm text-white transition"
                />
              </div>
              {icon}
            </div>
          );
        })}
      </div>

      <div className="flex justify-around gap-4">
        <IconButton
          label="再チャレンジ"
          icon={faRedo}
          onClick={() => navigate('/quiz')}
          className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-white transition"
        />
        <IconButton
          label="ゲーム設定"
          icon={faGear}
          onClick={() => navigate('/setup')}
          className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-white transition"
        />
      </div>
    </div>
  );
};
