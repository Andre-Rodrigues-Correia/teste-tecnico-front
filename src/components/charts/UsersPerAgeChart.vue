<template>
  <AppLoader v-if="isLoad" />
  <AppBarChart v-else :series="chartSeries" :chart-options="chartOptions" />

  <Snackbar v-model="snackbar.visible" :title="snackbar.title"
            :message="snackbar.message" @close-snackbar="snackbar.visible = false"
  />

</template>

<script>
import AppBarChart from "@/components/charts/base/BarChart.vue";
import userService from "@/services/userService";
import AppLoader from "@/components/generics/Loader.vue";
import Snackbar from "@/components/generics/Snackbar.vue";

export default {
  name: 'AppUserPerAgeChart',
  components: {Snackbar, AppLoader, AppBarChart },
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
          type: 'bar',
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
          },
        },
        yaxis: {
          title: {
            text: 'Quantidade'
          }
        },
      },
      chartSeries: [
        {
          name: 'Usuários',
          data: []
        }
      ]
    }
  },
  async created() {
    this.isLoad = true;
    await this.getData();
  },
  methods: {
    async getData() {
      try {
        const data = await userService.getAllUsers();

        const map = {};

        data.forEach(user => {
          if (!map[user.year]) {
            map[user.year] = 0;
          }
          map[user.year]++;
        });


        this.chartOptions.xaxis.categories = Object.keys(map);
        this.chartSeries[0].data = Object.values(map);
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