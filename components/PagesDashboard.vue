<script setup>
import Chart from 'chart.js/auto';
const props = defineProps(['url'])

const chartDataPages = {
    labels: [],
    datasets: [
        {
            label: 'Nombre de visites par page',
            backgroundColor: '#40A497',
            data: []
        }
    ]
}

const configPage = {
    type: 'bar',
    data: chartDataPages,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

let chartPage = null;

const supabase = useSupabaseClient();
const filterPage = ref('days');

onMounted(async () => {
    chartPage = new Chart(document.getElementById('chart-pages'), configPage);
    getVisits();
});

watch(filterPage, () => {
    getVisits();
});

async function getVisits() {
    let filter = null;
    switch (filterPage.value) {
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

    if (filterPage.value !== 'all') {
        await supabase
            .from('page_analytics')
            .select('*')
            .gte('date', filter)
            .eq('url', props.url)
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                } else {
                    const pagesCounts = {};
                    let pages_names = [];
                    let pages_data = [];

                    data.forEach((item) => {
                        if (pagesCounts[item.path]) {
                            pagesCounts[item.path]++;
                        } else {
                            pagesCounts[item.path] = 1;
                        }
                    });
                    pages_names = Object.keys(pagesCounts);
                    pages_data = Object.values(pagesCounts);
                    chartDataPages.labels = pages_names;
                    chartDataPages.datasets[0].data = pages_data;
                    chartPage.update();
                }
            })
    } else {
        await supabase
            .from('page_analytics')
            .select('*')
            .eq('url', props.url)
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                } else {
                    const pagesCounts = {};
                    let pages_names = [];
                    let pages_data = [];

                    data.forEach((item) => {
                        if (pagesCounts[item.pages_name]) {
                            pagesCounts[item.pages_name]++;
                        } else {
                            pagesCounts[item.pages_name] = 1;
                        }
                    });
                    pages_names = Object.keys(pagesCounts);
                    pages_data = Object.values(pagesCounts);
                    chartDataPages.labels = pages_names;
                    chartDataPages.datasets[0].data = pages_data;
                    chartPage.update();
                }
            })
    }
}
</script>

<template>
    <div class="card w-full bg-base-100 shadow-xl p-10">
        <div>
            <select class="select select-bordered w-full max-w-xs" v-model="filterPage">
                <option value="days">7 jours</option>
                <option value="month">1 mois</option>
                <option value="all">Depuis le début</option>
            </select>
        </div>
        <div class="h-full mt-5">
            <canvas id="chart-pages"></canvas>
        </div>
    </div>
</template>