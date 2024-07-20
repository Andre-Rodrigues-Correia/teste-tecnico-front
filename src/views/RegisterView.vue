<template>
  <v-container class="d-flex flex-column ">
    <h1 class="mx-auto">{{$t('register.title').toUpperCase()}}</h1>
    <v-form @submit.prevent="registerUser" class="w-75 mx-auto">
      <v-text-field :label="$t('register.email')" v-model="email" required></v-text-field>
      <v-text-field :label="$t('register.password')" v-model="password" required></v-text-field>
      <v-text-field :label="$t('register.confirmPassword')" v-model="confirmPassword" required></v-text-field>

      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" type="submit">{{ $t('buttons.register') }}</v-btn>

        <p class="ma-4">
          {{ $t('register.loginMessage')}}
          <a class="text-primary cursor-pointer" @click="navigateTo('login')">{{$t('register.hereClick')}}</a>
        </p>
      </div>

    </v-form>
  </v-container>
</template>

<script>
  import userService from "@/services/userService";

  export default {
    name: 'RegisterView',
    data(){
      return {
        email: null,
        password: null,
        confirmPassword: null
      }
    },
    methods: {
      async registerUser(){

        try {
          const createdUser = await userService.createUser({
            email: this.email,
            password: this.password
          });
          console.log(createdUser)
          alert(this.$t('register.success'))
        } catch (error) {
          console.error(`Error: ${error.message}`)
        }
      },
      navigateTo(destiny){
        this.$router.push({ name: destiny});
      }
    }
  }
</script>

<style scoped>

</style>