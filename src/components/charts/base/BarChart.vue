<template>
  <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series"></VueApexCharts>
</template>

<script>

import VueApexCharts from "vue3-apexcharts";
export default {
  name: 'AppBarChart',
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