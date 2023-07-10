<script setup>
definePageMeta({
  middleware: ["auth"],
});

import {Bar} from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

</script>

<template>
  <div>
    <p>Dashboard</p>

    <div class="card w-96 bg-base-100 shadow-xl">
      <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
      />
    </div>
  </div>
</template>