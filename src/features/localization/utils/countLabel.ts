import { TFunction } from 'i18next';

export const getCountLabel = (t: TFunction, keyPrefix: string, count: number) => {
  if (count >= 3 && count <= 10) return t(`${keyPrefix}.count_few_custom`, { count });
  return t(`${keyPrefix}.count`, { count });
};