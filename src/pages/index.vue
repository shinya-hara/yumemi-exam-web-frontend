<template>
  <h1 class="mb-8">都道府県別総人口</h1>

  <h2 class="text-h6">都道府県</h2>
  <div class="prefectures-container mb-8">
    <v-checkbox
      v-for="i in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']"
      :key="i"
      v-model="selected"
      :label="i"
      :value="i"
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

const selected = ref([]);

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
</script>

<style scoped lang="scss">
.prefectures-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
