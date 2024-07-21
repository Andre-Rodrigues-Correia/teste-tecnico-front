<template>
  <VueApexCharts type="pie" height="400" :options="chartOptions" :series="series"></VueApexCharts>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'AppPieChart',
  components: {
    VueApexCharts
  },
  props: {
    chartOptions: {
      type: Object,
      required: true
    },
    series: {
      type: Array,
      required: true
    }
  },
}
</script>
