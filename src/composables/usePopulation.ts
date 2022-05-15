import { PopulationRepository } from '@/repositories/populationRepository';
import type { PopulationPerYear } from '@/repositories/populationRepository';

export type { PopulationPerYear };

interface PrefecturePopulation {
  [prefCode: number]: PopulationPerYear;
}

export const usePopulation = (
  repository: PopulationRepository = new PopulationRepository(),
) => {
  const prefecturePopulation: PrefecturePopulation = reactive({});

  const getPrefecturePopulation = async (prefCode: number) => {
    // Return from cache
    if (prefecturePopulation[prefCode]) return prefecturePopulation[prefCode];

    const population = await repository.getPrefecturePopulation(prefCode);
    prefecturePopulation[prefCode] = population;
    return population;
  };

  return {
    prefecturePopulation,
    getPrefecturePopulation,
  };
};
