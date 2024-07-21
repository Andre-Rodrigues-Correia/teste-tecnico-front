<template>
  <v-container class="d-flex flex-column">
    <h2 class="mx-auto">{{ $t('views.users.title').toUpperCase()}}</h2>

    <v-btn class="w-25 ma-4" color="primary" @click="showAddUserModal">{{ $t('views.users.createUser')}}</v-btn>

    <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        :loading="loading"
    >

      <template v-slot:[`item.avatar`]="{ item }">
        <v-avatar >
          <v-img :src="item.avatar"></v-img>
        </v-avatar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="showEditUserModal(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon @click="showDeleteUserConfirmModal(item)" class="mr-2">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <UserFormModal v-if="showUserModal" v-model="showUserModal" :user="selectedUser" :isEdit="isEdit" @add="saveNewUser" @edit="saveEditedUser" @cancel="cancelAction"/>
    <Modal v-if="showConfirmModal" v-model="showConfirmModal" :title="$t('views.users.deleteUserTitle')" :text="$t('views.users.deleteUserText')" @confirm="deleteUser" @cancel="showConfirmModal=false"/>
  </v-container>
</template>

<script>
import userService from "@/services/userService";
import UserFormModal from "@/components/UserFormModal.vue";
import Modal from "@/components/generics/Modal.vue";

export default {
  name: 'UserList',
  components: {UserFormModal, Modal},
  data() {
    return {
      users: [],
      selectedUser: {},
      showUserModal: false,
      showConfirmModal: false,
      confirmDelete: false,
      isEdit: false,
      loading: false,
      page: 1,
      headers: [
        {title: this.$t('views.users.image'), key: 'avatar'},
        {title: this.$t('views.users.name'), key: 'first_name'},
        {title: this.$t('views.users.lastName'), key: 'last_name'},
        {title: this.$t('views.users.email'), key: 'email'},
        {title: this.$t('views.users.actions'), key: 'actions' }
      ]
    };
  },
  created() {
    this.getData();
  },
  computed: {
    confirmDeleteUser(){
      return this.confirmDelete;
    }
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        const response = await userService.getUsersPerPage();
        this.users = response.users;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    showEditUserModal(user){
      this.selectedUser = user;
      this.isEdit = true;
      this.showUserModal = true;
    },
    showAddUserModal(){
      this.selectedUser = {}
      this.showUserModal = true;
    },
    showDeleteUserConfirmModal(user){
      this.selectedUser = user;
      this.showConfirmModal = true;
    },
    saveEditedUser(user){
      console.log(user)
      this.showUserModal = false
    },
    saveNewUser(user){
      console.log(user)
      this.showUserModal = false;
    },
    deleteUser(){
      this.users = this.users.filter(user => user.id !== this.selectedUser.id);
      this.selectedUser = {};
      this.showConfirmModal = false;
    },
    cancelAction(){
      this.selectedUser = {}
      this.showUserModal = false;
    },
  }
};
</script>
