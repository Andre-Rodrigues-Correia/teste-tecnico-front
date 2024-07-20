<template>
    <v-snackbar
        v-model="visible"
        vertical
        timeout="4000"
    >
      <div class="text-subtitle-1 pb-2">{{ title }}</div>

      <p>{{ message}}</p>

      <template v-slot:actions>
        <v-btn
            color="indigo"
            variant="text"
            @click="close"
        >
          {{ $t('buttons.ok') }}
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
  export default {
    name: 'AppSnackBar',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Erro'
      },
      message: {
        type: String,
        default: 'Erro inesperado'
      }
    },
    computed: {
      visible: {
        get() {
          return this.value;
        },
      }
    },
    methods: {
      close(){
        this.$emit('close-snackbar')
      }
    }
  }
</script>

<style scoped>

</style>