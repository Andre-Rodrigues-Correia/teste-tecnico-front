<template>
  <v-app>
    <v-navigation-drawer v-if="!$route.meta.hideNavigation" expand-on-hover rail>
      <v-list nav>
        <v-list-item
            prepend-icon="mdi-account-multiple-plus"
            :title="$t('navigation.addUser')"
            @click="navigateTo('users')"
            class="cursor-pointer"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <AppHeader />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import AppHeader from "@/components/Header.vue";

export default {
  name: 'App',
  components: {AppHeader},
  methods: {
    navigateTo(destiny){
      this.$router.push({name: destiny})
    }
  }
}
</script>
