<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
  >
    <v-card :title="title">
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-btn
               color="primary"
               :text="$t('buttons.ok')"
               variant="tonal"
               @click="confirm"
        ></v-btn>
        <v-btn
            color="accent"
            :text="$t('buttons.cancel')"
            variant="tonal"
            @click="cancel"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>


export default {
  name: 'AppModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
    }
  },
  methods: {
    confirm(){
      this.$emit('confirm')
    },
    cancel(){
      this.$emit('cancel')
    }
  },
}
</script>

<style scoped>

</style>