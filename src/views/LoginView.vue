<template>
  <v-container class="d-flex flex-column ">
    <h1 class="mx-auto">{{$t('views.login.title').toUpperCase()}}</h1>
    <v-form  ref="form" v-model="valid" @submit.prevent="login" class="w-75 mx-auto">
      <v-text-field :label="$t('views.login.email')" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
      <v-text-field :label="$t('views.login.password')" v-model="password" :rules="[rules.required]"></v-text-field>

      <div class="d-flex justify-center align-center">
        <v-btn class="ma-4" type="submit">{{ $t('buttons.login') }}</v-btn>

        <p class="ma-4">
          {{ $t('views.login.registerMessage')}}
          <a class="text-primary cursor-pointer" @click="navigateTo('register')">{{$t('views.login.hereClick')}}</a>
        </p>
      </div>

    </v-form>

    <Snackbar v-model="snackbar.visible" :title="snackbar.title"
              :message="snackbar.message" @close-snackbar="snackbar.visible = false"
    />
  </v-container>
</template>

<script>
import userService from "@/services/userService";
import Snackbar from "@/components/generics/Snackbar.vue";
export default {
  name: 'LoginView',
  components: {
    Snackbar
  },
  data(){
    return {
      email: null,
      password: null,
      rules: {
        required: (value) => !!value || this.$t('warnings.requiredField'),
        email: (value) => {
          const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          return pattern.test(value) || this.$t('warnings.invalidEmail');
        },
      },
      valid:false,
      snackbar: {
        visible: false,
        title: '',
        message: '',
      }
    }
  },
  methods: {
    async login(){

      await this.$refs.form.validate();
      if(!this.valid){
        return
      }

      try {
        const userLogged = await userService.createUser({
          email: this.email,
          password: this.password
        });

        localStorage.setItem('token', userLogged.token);
        this.$router.push({name: 'home'});
      } catch (error) {
        console.error(`Error: ${error.message}`)
        this.snackbar.title = this.$t('views.login.errorTitle');
        this.snackbar.message = this.$t('views.login.errorMessage');
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