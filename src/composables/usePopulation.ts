import { PopulationRepository } from '@/repositories/populationRepository';
import type { PopulationPerYear } from '@/repositories/populationRepository';
import type { Prefecture } from '@/repositories/prefectureRepository';

export type { PopulationPerYear };

interface PrefecturePopulation {
  [prefCode: number]: {
    prefecture: Prefecture;
    data: PopulationPerYear;
  };
}

export const usePopulation = (
  repository: PopulationRepository = new PopulationRepository(),
) => {
  const prefecturePopulation: PrefecturePopulation = reactive({});

  const getPrefecturePopulation = async (prefecture: Prefecture) => {
    // Return from cache
    if (prefecturePopulation[prefecture.prefCode])
      return prefecturePopulation[prefecture.prefCode];

    const population = await repository.getPrefecturePopulation(
      prefecture.prefCode,
    );
    prefecturePopulation[prefecture.prefCode] = {
      prefecture,
      data: population,
    };
    return population;
  };

  return {
    prefecturePopulation,
    getPrefecturePopulation,
  };
};
