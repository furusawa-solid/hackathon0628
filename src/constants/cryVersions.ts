import { CryVersions } from '../schemas/cryVersion';

export const CRY_VERSION_OPTIONS = [
  {
    label: '旧バージョン',
    value: CryVersions.LEGACY,
    description: '5世代以前の鳴き声でプレイする',
  },
  {
    label: '新バージョン',
    value: CryVersions.LATEST,
    description: '6世代以降の鳴き声でプレイする',
  },
];
