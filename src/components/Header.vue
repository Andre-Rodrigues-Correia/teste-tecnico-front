<template>
  <v-app-bar color="primary">
    <v-toolbar-title class="cursor-pointer" @click="navigateTo('home')">{{ $t('header.title').toUpperCase() }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon @click="toggleTheme">
      <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-menu transition="fade-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          {{ $t('header.idiom')}}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="(language, index) in languages"
            :key="index"
            @click="changeLanguage(language.code)"
        >
          <v-list-item-title>{{ language.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn v-if="!$route.meta.hideNavigation" icon @click="logout" class="mr-2">
      <v-icon icon="mdi-logout"></v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      languages: [
        { code: 'pt', label: this.$t('header.portuguese') },
        { code: 'en', label: this.$t('header.english') },
      ],
      isDark: true,
    };
  },
  created() {
    this.isDark = this.$vuetify.theme.global.name.value === 'darkTheme';
  },
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      this.$vuetify.theme.global.name = this.isDark ? 'darkTheme' : 'lightTheme';
    },
    navigateTo(destiny){
      this.$router.push({name: destiny})
    },
    logout(){
      localStorage.removeItem('token');
      this.$router.replace({name: 'login'})
    }
  },
};
</script>

<style scoped>

</style>
