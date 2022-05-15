<template>
  <h1 class="mb-8">都道府県別総人口</h1>

  <h2 class="text-h6">都道府県</h2>
  <div class="prefectures-container mb-8">
    <v-checkbox
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      v-model="selectedPrefectures"
      :label="prefecture.prefName"
      :value="prefecture.prefCode"
      hide-details
      density="compact"
      inline
      color="primary"
    />
  </div>

  <LineChart v-if="selectedPrefectures.length" :chart-data="chartData" />
</template>

<script setup lang="ts">
import LineChart from '@/components/LineChart';
import { Prefecture, usePrefecture } from '@/composables/usePrefecture';
import { PopulationPerYear, usePopulation } from '@/composables/usePopulation';

const { prefectures } = usePrefecture();
const { prefecturePopulation, getPrefecturePopulation } = usePopulation();

const selectedPrefectures = ref<Prefecture['prefCode'][]>([
  // Set default prefectures if needed
]);

const activePrefecturePopulation = computed<[number, PopulationPerYear][]>(
  () => {
    return Object.entries(prefecturePopulation)
      .filter((item) => selectedPrefectures.value.includes(Number(item[0])))
      .map((item) => [Number(item[0]), item[1]]);
  },
);

const chartData = computed(() => {
  if (!activePrefecturePopulation.value.length)
    return {
      labels: [],
      datasets: [],
    };

  const count = activePrefecturePopulation.value.length;
  const labels = activePrefecturePopulation.value[0][1].map((item) =>
    String(item.year),
  );

  const datasets = activePrefecturePopulation.value.map((pref, i) => {
    return {
      label: prefectures.value.find((v) => v.prefCode === pref[0])?.prefName,
      backgroundColor: getChartLineColor(count, i),
      data: pref[1].map((item) => item.value),
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
const getChartLineColor = (count: number, index: number) => {
  const hue = (360 /* degree */ / count) /* 表示項目数 */ * index;
  return `hsl(${hue}, 60%, 60%)`;
};

watch(
  selectedPrefectures,
  async (prefectures) => {
    await Promise.all(
      prefectures.map((prefCode) => getPrefecturePopulation(prefCode)),
    );
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lang="scss">
.prefectures-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
