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

  <LineChart :chart-data="chartData" />
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

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40],
    },
    {
      label: 'Data Two',
      backgroundColor: '#287979',
      data: [20, 69, 30, 50, 29, 10, 90],
    },
  ],
});

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
