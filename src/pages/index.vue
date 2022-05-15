<template>
  <h1 class="mb-8">都道府県別総人口</h1>

  <h2 class="text-h6">都道府県</h2>
  <div class="prefectures-container mb-8">
    <v-checkbox
      v-for="prefecture in prefectures"
      :key="prefecture.prefCode"
      v-model="selectedPrefectures"
      :label="prefecture.prefName"
      :value="prefecture"
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
import { usePrefecturePopulation } from '@/composables/usePrefecturePopulation';

const { prefectures, selectedPrefectures, chartData } =
  usePrefecturePopulation();
</script>

<style scoped lang="scss">
.prefectures-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
