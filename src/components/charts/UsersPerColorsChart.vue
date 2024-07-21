<template>
  <AppLoader v-if="isLoad" />
  <LineChart v-else :series="chartSeries" :chart-options="chartOptions" />

  <Snackbar v-model="snackbar.visible" :title="snackbar.title"
            :message="snackbar.message" @close-snackbar="snackbar.visible = false"
  />
</template>

<script>
import LineChart from "@/components/charts/base/LineChart.vue";
import userService from "@/services/userService";
import AppLoader from "@/components/generics/Loader.vue";
import Snackbar from "@/components/generics/Snackbar.vue";

export default {
  name: 'AppUserPerAgeChart',
  components: { Snackbar, AppLoader, LineChart },
  data() {
    return {
      isLoad: false,
      snackbar: {
        visible: false,
        title: this.$t('charts.errorTitle'),
        message: this.$t('charts.errorMessage'),
      },
      chartOptions: {
        chart: {
          type: 'line',
          background: 'transparent',
          foreColor: '#255aee',
          toolbar: {
            show: false
          }
        },
        theme: {
          mode: 'dark',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'dark',
            shadeIntensity: 0.65
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Ano'
          }
        },
        yaxis: {
          title: {
            text: 'Quantidade'
          }
        },
        markers: {
          size: 5
        },
        tooltip: {
          shared: true,
          intersect: false
        }
      },
      chartSeries: []
    };
  },
  async created() {
    this.isLoad = true;
    await this.getData();
  },
  methods: {
    async getData() {
      try {
        const data = await userService.getAllUsers();

        const years = [...new Set(data.map(item => item.year))];
        const colorNames = [...new Set(data.map(item => item.name))];

        const series = colorNames.map(name => {
          return {
            name: name,
            data: years.map(year => {
              return data.filter(item => item.name === name && item.year === year).length;
            })
          };
        });

        this.chartOptions.xaxis.categories = years;
        this.chartSeries = series;
      } catch (error) {
        console.error(error);
        this.snackbar.visible = true;
      } finally {
        this.isLoad = false;
      }
    }
  }
}
</script>
