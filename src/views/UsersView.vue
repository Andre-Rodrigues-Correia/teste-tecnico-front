<template>
  <v-container class="d-flex flex-column">
    <h2 class="mx-auto">{{ $t('views.users.title').toUpperCase()}}</h2>

    <v-autocomplete
        class="w-lg-25 mb-4"
        v-model="search"
        :items="userNames"
        label="Buscar usuário"
        clearable
        hide-no-data
        hide-details
        solo
    ></v-autocomplete>

    <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :items-per-page="5"
        :loading="loading"
    >

      <template v-slot:[`item.avatar`]="{ item }">
        <v-avatar>
          <v-img v-if="item.avatar" :src="item.avatar"></v-img>
          <v-img v-else src="https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"></v-img>
        </v-avatar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="showEditUserModal(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon @click="showDeleteUserConfirmModal(item)" class="mr-2">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-btn class="mt-4 w-lg-25" size="large" color="primary" @click="showAddUserModal">{{ $t('views.users.createUser')}}</v-btn>

    <UserFormModal v-if="showUserModal" v-model="showUserModal" :user="selectedUser" :isEdit="isEdit" @add="saveNewUser" @edit="saveEditedUser" @cancel="cancelAction"/>
    <Modal v-if="showConfirmModal" v-model="showConfirmModal" :title="$t('views.users.deleteUserTitle')" :text="$t('views.users.deleteUserText')" @confirm="deleteSelectedUser" @cancel="showConfirmModal=false"/>

    <Snackbar v-model="snackbar.visible" :title="snackbar.title"
              :message="snackbar.message" @close-snackbar="snackbar.visible = false"
    />

  </v-container>
</template>

<script>
import UserFormModal from "@/components/UserFormModal.vue";
import Modal from "@/components/generics/Modal.vue";
import {mapActions, mapGetters} from "vuex";
import Snackbar from "@/components/generics/Snackbar.vue";

export default {
  name: 'UserList',
  components: {Snackbar, UserFormModal, Modal},
  data() {
    return {
      users: [],
      selectedUser: {},
      search: '',
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
      ],
      snackbar: {
        visible: false,
        title: '',
        message: '',
      },
    };
  },
  async created() {
    await this.getData();
  },
  computed: {
    userNames() {
      return this.users.map(user => user.first_name)
    },
    filteredUsers() {
      if (this.search) {
        return this.users.filter(user => {
          return user.first_name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      return this.users
    },
  },
  methods: {
    ...mapActions('users', ['setUsers', 'updateUser', 'addUser', 'deleteUser']),
    ...mapGetters('users', ['getUsers']),
    async getData() {
      this.loading = true;
      try {
        this.users = await this.getUsers();
        if(this.users.length <= 0){
          await this.setUsers();
          this.users = await this.getUsers();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    showEditUserModal(user){
      this.selectedUser = {...user};
      this.isEdit = true;
      this.showUserModal = true;
    },
    showAddUserModal(){
      this.selectedUser = {}
      this.showUserModal = true;
    },
    showDeleteUserConfirmModal(user){
      this.selectedUser = {...user}
      this.showConfirmModal = true;
    },
    async saveEditedUser(user){
      try {
        await this.updateUser(user);
        this.showUserModal = false;
        this.isEdit = false;
        this.snackbar.title = this.$t('views.users.successTitle');
        this.snackbar.message = this.$t('views.users.successEditMessage');
        this.snackbar.visible = true;
      } catch (error) {
        console.error(error)
        this.snackbar.title = this.$t('views.users.errorTitle');
        this.snackbar.message = this.$t('views.users.errorEditMessage');
        this.snackbar.visible = true;
      }
    },
    async saveNewUser(user){
      try {
        await this.addUser(user);
        this.showUserModal = false;
        this.snackbar.title = this.$t('views.users.successTitle');
        this.snackbar.message = this.$t('views.users.successAddMessage');
        this.snackbar.visible = true;
      } catch (error) {
        console.error(error)
        this.snackbar.title = this.$t('views.users.errorTitle');
        this.snackbar.message = this.$t('views.users.errorAddMessage');
        this.snackbar.visible = true;
      }
    },
    async deleteSelectedUser(){
      try {
        await this.deleteUser(this.selectedUser);
        await this.updateUsersList();
        this.selectedUser = {};
        this.showConfirmModal = false;
        this.snackbar.title = this.$t('views.users.successTitle');
        this.snackbar.message = this.$t('views.users.successDeleteMessage');
        this.snackbar.visible = true;
      } catch (error) {
        console.error(error)
        this.snackbar.title = this.$t('views.users.errorTitle');
        this.snackbar.message = this.$t('views.users.errorDeleteMessage');
        this.snackbar.visible = true;
      }

    },
    cancelAction(){
      this.selectedUser = {}
      this.showUserModal = false;
      this.isEdit = false;
    },
    async updateUsersList(){
      this.users = await this.getUsers();
    }
  }
};
</script>
