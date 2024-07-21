<template>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card prepend-icon="mdi-account" :title="$t('views.users.creatUser').toUpperCase()">
        <v-card-text>
          <v-text-field :label="$t('views.users.name')" v-model="selectedUser.first_name" :rules="[rules.required]"></v-text-field>
          <v-text-field :label="$t('views.users.lastName')" v-model="selectedUser.last_name" :rules="[rules.required]"></v-text-field>
          <v-text-field :label="$t('views.login.email')" v-model="selectedUser.email" :rules="[rules.required]"></v-text-field>
          <v-text-field :label="`${$t('views.users.image')} (url)`" v-model="selectedUser.avatar"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="!isEdit"
              color="primary"
              :text="$t('buttons.register')"
              variant="tonal"
              @click="addUser"
          ></v-btn>
          <v-btn v-if="isEdit"
              color="secondary"
              :text="$t('buttons.save')"
              variant="tonal"
              @click="editUser"
          ></v-btn>
          <v-btn
              color="accent"
              :text="$t('buttons.close')"
              variant="tonal"
              @click="cancel"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>


export default {
  name: 'AppUserFormModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object
    }
  },
  data(){
    return {
      selectedUser: this.user,
      rules: {
        required: (value) => !!value || this.$t('warnings.requiredField'),
      },
    }
  },
  created() {
    console.log(this.selectedUser)
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
    }
  },
  methods: {
    addUser(){
      this.$emit('add', this.selectedUser)
    },
    editUser(){
      this.$emit('edit', this.selectedUser)
    },
    cancel(){
      this.$emit('cancel')
    }
  },
}
</script>

<style scoped>

</style>