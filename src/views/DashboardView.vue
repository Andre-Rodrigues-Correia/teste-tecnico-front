<template>
  <v-container fluid class="d-flex flex-column">
    <h2 class="mx-auto ma-2">{{ $t('views.dashboard.title').toUpperCase()}}</h2>
    <v-row>
      <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          >
          <Card
              :title="card.title"
              :resume="card.resume"
              :component="card.component"
          />
      </v-col>
    </v-row>

  </v-container>
</template>

<script >
import Card from "@/components/generics/Card.vue";
import UsersPerYearChart from "@/components/charts/UsersPerYearChart.vue";
import UsersPerAgeChart from "@/components/charts/UsersPerAgeChart.vue";
import UsersPerColorsChart from "@/components/charts/UsersPerColorsChart.vue";
export default {
  name: 'DashboardView',
  components: {
    Card
  },
  data(){
    return {
      cards: [
        { title: this.$t('charts.userPerYearChart.title'), resume: this.$t('charts.userPerYearChart.resume'), component: UsersPerYearChart },
        { title: this.$t('charts.userPerAgeChart.title'), resume: this.$t('charts.userPerAgeChart.resume'), component: UsersPerAgeChart },
        { title: this.$t('charts.userPerColorsChart.title'), resume: this.$t('charts.userPerColorsChart.resume'), component: UsersPerColorsChart },
      ],
    }
  }
}
</script>

<style scoped>

</style>