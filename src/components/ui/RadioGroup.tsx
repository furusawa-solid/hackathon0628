import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Description,
  RadioGroup as HeadlessRadioGroup,
  Radio,
} from '@headlessui/react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type Option<T extends string | number> = {
  label: string;
  value: T;
  description: string;
};

type Props<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TValue extends string | number,
> = {
  control: Control<TFieldValues>;
  name: TName;
  options: Option<TValue>[];
};

export const RadioGroup = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TValue extends string | number,
>({
  control,
  name,
  options,
}: Props<TFieldValues, TName, TValue>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="w-full">
          <div className="mx-auto w-full max-w-lg">
            <HeadlessRadioGroup
              value={field.value}
              onChange={field.onChange}
              className="space-y-2"
            >
              {options.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  className="group relative flex cursor-pointer rounded-lg bg-white/5 px-3 py-2 text-white shadow-md transition focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white"
                >
                  <div className="flex w-full items-center justify-between gap-2 text-sm/6">
                    <p className="whitespace-nowrap text-white">
                      {option.label}
                    </p>

                    <Description className="w-full break-words text-left text-white/50">
                      {option.description}
                    </Description>

                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="size-6 text-teal-600 opacity-0 transition group-data-checked:opacity-100"
                    />
                  </div>
                </Radio>
              ))}
            </HeadlessRadioGroup>
          </div>
        </div>
      )}
    />
  );
};
