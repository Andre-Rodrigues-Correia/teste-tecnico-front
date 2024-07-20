<template>
  <v-app>
    <v-main>
      <AppHeader />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import AppHeader from "@/components/Header.vue";

export default {
  name: 'App',
  components: {AppHeader},
}
</script>
