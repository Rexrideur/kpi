<script setup>
import Chart from 'chart.js/auto';
const props = defineProps(['url'])

const chartDataClick = {
  labels: [],
  datasets: [
    {
      label: 'Nombre de clics par bouton',
      backgroundColor: '#f87979',
      data: []
    }
  ]
}

const configClick = {
  type: 'bar',
  data: chartDataClick,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

let chartClick = null;

const supabase = useSupabaseClient();
const filterClick = ref('days');

onMounted(async () => {
  chartClick = new Chart(document.getElementById('chart-click'), configClick);
  getClicks();
});

watch(filterClick, () => {
  getClicks();
});

async function getClicks () {
  let filter = null;
  switch (filterClick.value) {
    case 'days':
    {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 7);

      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      const day = ("0" + currentDate.getDate()).slice(-2);

      filter = year + "-" + month + "-" + day;
    }
      break;
    case 'month':
    {
      let currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 1);

      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      const day = ("0" + currentDate.getDate()).slice(-2);

      filter = year + "-" + month + "-" + day;
    }
      break;
  }

  if (filterClick.value !== 'all') {
    await supabase
        .from('button_analytics')
        .select('*')
        .gte('date', filter)
        .eq('url', props.url)
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
            chartClick.update();
          }
        })
  }else{
    await supabase
        .from('button_analytics')
        .select('*')
        .eq('url', props.url)
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
            chartClick.update();
          }
        })
  }
}
</script>

<template>
  <div class="card w-full bg-base-100 shadow-xl p-10">
    <div>
      <select class="select select-bordered w-full max-w-xs" v-model="filterClick">
        <option value="days">7 jours</option>
        <option value="month">1 mois</option>
        <option value="all">Depuis le début</option>
      </select>
    </div>
    <div class="h-full mt-5">
      <canvas
          id="chart-click"
      ></canvas>
    </div>
  </div>
</template>