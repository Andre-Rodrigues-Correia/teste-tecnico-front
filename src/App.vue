<template>
  <v-app>
    <v-navigation-drawer v-if="!$route.meta.hideNavigation" expand-on-hover rail>
      <v-list nav>
        <v-list-item
            prepend-icon="mdi-account-multiple-plus"
            :title="$t('navigation.users')"
            @click="navigateTo('users')"
            class="cursor-pointer"
        ></v-list-item>
        <v-list-item
            prepend-icon="mdi-monitor-dashboard"
            :title="$t('navigation.dashboard')"
            @click="navigateTo('dashboard')"
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
import {mapActions} from "vuex";

export default {
  name: 'App',
  components: {AppHeader},
  async created() {
    await this.setAllUsers();
  },
  methods: {
    ...mapActions('users', ['setUsers']),
    navigateTo(destiny){
      this.$router.push({name: destiny})
    },
    async setAllUsers(){
      await this.setUsers();
    }
  }
}
</script>
