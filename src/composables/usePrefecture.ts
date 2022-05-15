import { PrefectureRepository } from '@/repositories/prefectureRepository';
import type { Prefecture } from '@/repositories/prefectureRepository';

export { Prefecture };

export const usePrefecture = (
  repository: PrefectureRepository = new PrefectureRepository(),
) => {
  const prefectures = ref<Prefecture[]>([]);

  const getList = async () => {
    return await repository.getList();
  };

  getList().then((v) => {
    prefectures.value = v;
  });

  return {
    prefectures,
  };
};
