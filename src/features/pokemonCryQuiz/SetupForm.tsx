import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../../components/ui/Divider';
import { FieldsetGroup } from '../../components/ui/FieldsetGroup';
import { Heading } from '../../components/ui/Heading';
import { LabelButton } from '../../components/ui/LabelButton';
import { RadioGroup } from '../../components/ui/RadioGroup';
import { type GameConfig, configSchema } from '../../schemas/config';
import { CryVersions } from '../../schemas/cries';
import { Generations } from '../../schemas/generation';
import { useConfigStore } from '../../stores/config';

export const SetupForm = () => {
  const navigate = useNavigate();
  const { setGeneration, setCryVersion } = useConfigStore();

  const { control, handleSubmit, reset } = useForm<GameConfig>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      generation: Generations.I,
      cryVersion: CryVersions.LEGACY,
    },
  });

  const onSubmit = (form: GameConfig) => {
    const { generation, cryVersion } = form;
    setGeneration(generation);
    setCryVersion(cryVersion);
    reset();
    navigate('/quiz');
  };

  // TODO: どっかに切り出した方がいい
  const generations = [
    { label: '第1世代', value: Generations.I, description: '赤・緑' },
    { label: '第2世代', value: Generations.II, description: '金・銀' },
    {
      label: '第3世代',
      value: Generations.III,
      description: 'ルビー・サファイア',
    },
    {
      label: '第4世代',
      value: Generations.IV,
      description: 'ダイヤモンド・パール',
    },
    {
      label: '第5世代',
      value: Generations.V,
      description: 'ブラック・ホワイト',
    },
    { label: '第6世代', value: Generations.VI, description: 'X・Y' },
    {
      label: '第7世代',
      value: Generations.VII,
      description: "サン・ムーン/Let's Go! ピカチュウ・Let's Go! イーブイ",
    },
    {
      label: '第8世代',
      value: Generations.VIII,
      description: 'ソード・シールド/LEGENDS アルセウス',
    },
    {
      label: '第9世代',
      value: Generations.IX,
      description: 'スカーレット・バイオレット',
    },
  ];

  // TODO: どっかに切り出した方がいい
  const cryVersions = [
    {
      label: '旧バージョン',
      value: CryVersions.LEGACY,
      description:
        '5世代以前の鳴き声でプレイします。\n※第6世代以降を選んだ場合は新バージョンの鳴き声になります。',
    },
    {
      label: '新バージョン',
      value: CryVersions.LATEST,
      description: '6世代以降の鳴き声でプレイします。',
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-y-3 rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-lg">
      <Heading level={3} className="font-bold text-xl text-yellow-400">
        クイズ設定
      </Heading>

      <FieldsetGroup
        legend="出題範囲"
        className="flex flex-col gap-y-1.5"
        legendClassName="text-base font-semibold"
      >
        <RadioGroup control={control} name="generation" options={generations} />
      </FieldsetGroup>

      <Divider />

      <FieldsetGroup
        legend="鳴き声のバージョン"
        className="flex flex-col gap-y-1.5"
        legendClassName="text-base font-semibold"
      >
        <RadioGroup control={control} name="cryVersion" options={cryVersions} />
      </FieldsetGroup>

      <LabelButton
        label="はじめる"
        onClick={handleSubmit(onSubmit)}
        className="w-full py-2 font-semibold text-white transition"
      />
    </div>
  );
};
