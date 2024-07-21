<template>
  <v-container class="d-flex flex-column ">
    <h1 class="mx-auto">{{$t('views.register.title').toUpperCase()}}</h1>
    <v-form  ref="form" v-model="valid" @submit.prevent="registerUser" class="w-75 mx-auto">
      <v-text-field :label="$t('views.register.email')" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
      <v-text-field :label="$t('views.register.password')" v-model="password" :rules="[rules.required]"></v-text-field>
      <v-text-field :label="$t('views.register.confirmPassword')" v-model="confirmPassword" :rules="[rules.required, rules.confirmPassword]"></v-text-field>

      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" color="primary" type="submit">{{ $t('buttons.register') }}</v-btn>

        <p class="ma-4">
          {{ $t('views.register.loginMessage')}}
          <a class="text-primary cursor-pointer" @click="navigateTo('login')">{{$t('views.register.hereClick')}}</a>
        </p>
      </div>

    </v-form>

    <Loader v-if="isLoad"/>

    <Snackbar v-model="snackbar.visible" :title="snackbar.title"
              :message="snackbar.message" @close-snackbar="snackbar.visible = false"
    />
  </v-container>
</template>

<script>
  import userService from "@/services/userService";
  import Snackbar from "@/components/generics/Snackbar.vue";
  import Loader from "@/components/generics/Loader.vue";
  export default {
    name: 'RegisterView',
    components: {
      Snackbar,
      Loader
    },
    data(){
      return {
        email: null,
        password: null,
        confirmPassword: null,
        rules: {
          required: (value) => !!value || this.$t('warnings.requiredField'),
          email: (value) => {
            const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            return pattern.test(value) || this.$t('warnings.invalidEmail');
          },
          confirmPassword: () => {
            return this.password === this.confirmPassword || this.$t('warnings.matchPassword')
          }
        },
        valid:false,
        snackbar: {
          visible: false,
          title: '',
          message: '',
        },
        isLoad: false
      }
    },
    methods: {
      async registerUser(){

        await this.$refs.form.validate();
        if(!this.valid){
          return
        }

        try {
          this.isLoad = true;
          const createdUser = await userService.createUser({
            email: this.email,
            password: this.password
          });

          localStorage.setItem('token', createdUser.token);
          this.isLoad = false;
          this.$router.push({name: 'home'})
        } catch (error) {
          console.error(`Error: ${error.message}`)
          this.isLoad = false;
          this.snackbar.title = this.$t('views.register.errorTitle');
          this.snackbar.message = this.$t('views.register.errorMessage');
          this.snackbar.visible = true;
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