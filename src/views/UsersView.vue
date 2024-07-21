<template>
  <v-container>
    <h2 class="mx-auto ma-2">{{ $t('views.users.title').toUpperCase()}}</h2>
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
        <v-icon @click="deleteUser(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon @click="deleteUser(item)" class="mr-2">mdi-delete</v-icon>
      </template>

    </v-data-table>
  </v-container>
</template>

<script>
import userService from "@/services/userService";

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
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
    deleteUser(selectedUser){
      this.users = this.users.filter(user => user.id !== selectedUser.id);
    }
  }
};
</script>
