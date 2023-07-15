<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "custom",
});

import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

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

const chartDataClick = {
  labels: [],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: []
    }
  ]
}

const chartOptionsClick = {
  responsive: true,
  maintainAspectRatio: false
}


const supabase = useSupabaseClient();
const showClickChart = ref(false);

onMounted(() => {
  console.log('Component is mounted');
  const {data} = supabase
      .from('button_analytics')
      .select('*')
      .then(({data, error}) => {
        if (error) {
          console.log(error)
        } else {
          const buttonCounts = {};
          let button_names = [];
          let button_data = [];

          data.forEach((item) => {
            if (buttonCounts[item.button_name]) {
              buttonCounts[item.button_name]++;
            } else {
              buttonCounts[item.button_name] = 1;
            }
          });
          button_names = Object.keys(buttonCounts);
          button_data = Object.values(buttonCounts);
          chartDataClick.labels = button_names;
          chartDataClick.datasets[0].data = button_data;
          showClickChart.value = true;
        }
      })
})

</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <div class="card w-full bg-base-100 shadow-xl p-10">
        <Bar
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
        />
      </div>
      <div class="card w-full bg-base-100 shadow-xl p-10" v-if="showClickChart">
        <Bar
            id="chart-click"
            :options="chartOptionsClick"
            :data="chartDataClick"
        />
      </div>
    </div>
  </div>
</template>