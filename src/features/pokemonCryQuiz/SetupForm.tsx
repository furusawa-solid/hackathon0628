import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../../components/ui/Divider';
import { FieldsetGroup } from '../../components/ui/FieldsetGroup';
import { Heading } from '../../components/ui/Heading';
import { LabelButton } from '../../components/ui/LabelButton';
import { RadioGroup } from '../../components/ui/RadioGroup';
import { CRY_VERSION_OPTIONS } from '../../constants/cryVersions';
import { GENERATION_OPTIONS } from '../../constants/generations';
import { type GameConfig, configSchema } from '../../schemas/config';
import { CryVersions } from '../../schemas/cryVersion';
import { Generations } from '../../schemas/generation';
import { useConfigStore } from '../../stores/config';

export const SetupForm = () => {
  const navigate = useNavigate();
  const { setGeneration, setCryVersion } = useConfigStore();

  const { control, handleSubmit, reset, setValue, watch } = useForm<GameConfig>(
    {
      resolver: zodResolver(configSchema),
      defaultValues: {
        generation: Generations.I,
        cryVersion: CryVersions.LEGACY,
      },
    },
  );

  const generation = watch('generation');

  useEffect(() => {
    if (generation >= Generations.VI) {
      setValue('cryVersion', CryVersions.LATEST);
    }
  }, [generation, setValue]);

  const onSubmit = (form: GameConfig) => {
    const { generation, cryVersion } = form;
    setGeneration(generation);
    setCryVersion(cryVersion);
    reset();
    navigate('/quiz');
  };

  const cryVersionOptions = CRY_VERSION_OPTIONS.map((option) => ({
    ...option,
    disabled:
      generation >= Generations.VI && option.value === CryVersions.LEGACY,
  }));

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
        <RadioGroup
          control={control}
          name="generation"
          options={GENERATION_OPTIONS}
        />
      </FieldsetGroup>

      <Divider />

      <FieldsetGroup
        legend="鳴き声のバージョン"
        className="flex flex-col gap-y-1.5"
        legendClassName="text-base font-semibold"
      >
        <RadioGroup
          control={control}
          name="cryVersion"
          options={cryVersionOptions}
        />
      </FieldsetGroup>

      <LabelButton
        label="はじめる"
        onClick={handleSubmit(onSubmit)}
        className="w-full py-2 font-semibold text-white transition"
      />
    </div>
  );
};
