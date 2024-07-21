<template>
  <v-container class="d-flex flex-column">
      <h2 class="mx-auto">{{$t('views.notFound.title').toUpperCase()}}</h2>
      <v-img class="mx-auto mt-4 mb-10" src="https://static-00.iconduck.com/assets.00/9-404-error-illustration-2048x908-vp03fkyu.png" width="600"></v-img>
      <div class="d-flex flex-row mx-auto">
        <v-btn class="ma-4 w-lg-50" size="large" color="primary" @click="navigateTo('login')">{{ $t('views.notFound.login')}}</v-btn>
        <v-btn class="ma-4 w-lg-50" size="large" color="primary" @click="navigateTo('register')">{{ $t('views.notFound.register')}}</v-btn>
      </div>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    navigateTo(destiny){
      this.$router.push({name: destiny})
    }
  }
}
</script>