import { Generations } from '../schemas/generation';

export const GENERATION_OPTIONS = [
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
