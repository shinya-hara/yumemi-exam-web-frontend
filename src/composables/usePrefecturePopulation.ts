import { PopulationPerYear, usePopulation } from './usePopulation';
import { Prefecture, usePrefecture } from './usePrefecture';

export const usePrefecturePopulation = () => {
  const { prefectures } = usePrefecture();
  const { prefecturePopulation, getPrefecturePopulation } = usePopulation();

  const selectedPrefectures = ref<Prefecture[]>([
    // Set default prefectures if needed
  ]);

  const activePrefecturePopulation = computed<
    [number, { prefecture: Prefecture; data: PopulationPerYear }][]
  >(() => {
    return Object.entries(prefecturePopulation)
      .filter((item) =>
        selectedPrefectures.value
          .map((pref) => pref.prefCode)
          .includes(Number(item[0])),
      )
      .map((item) => [Number(item[0]), item[1]]);
  });

  const chartData = computed(() => {
    if (!activePrefecturePopulation.value.length)
      return {
        labels: [],
        datasets: [],
      };

    const count = activePrefecturePopulation.value.length;
    const labels = activePrefecturePopulation.value[0][1].data.map((item) =>
      String(item.year),
    );

    const datasets = activePrefecturePopulation.value.map((pref, i) => {
      return {
        label: pref[1].prefecture.prefName,
        backgroundColor: _getChartLineColor(count, i),
        data: pref[1].data.map((item) => item.value),
      };
    });

    return {
      labels,
      datasets,
    };
  });

  /**
   * チャートの線の色を表示項目数に応じていい感じに算出する
   * @param count
   * @param index
   */
  const _getChartLineColor = (count: number, index: number) => {
    const hue = (360 /* degree */ / count) /* 表示項目数 */ * index;
    return `hsl(${hue}, 60%, 60%)`;
  };

  watch(
    selectedPrefectures,
    async (prefectures) => {
      await Promise.all(
        prefectures.map((prefecture) => getPrefecturePopulation(prefecture)),
      );
    },
    {
      immediate: true,
    },
  );

  return {
    prefectures,
    selectedPrefectures,
    chartData,
  };
};
