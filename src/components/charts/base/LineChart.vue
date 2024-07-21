<template>
  <VueApexCharts type="line" height="400" :options="chartOptions" :series="series"></VueApexCharts>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'AppLineChart',
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
