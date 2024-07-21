import userService from "@/services/userService";

const state = {
    users: []
};


const mutations = {
    SET_USERS(state, users){
        state.users = users;
    },
    ADD_USER(state, user){
        state.users.push(user)
    },
    UPDATE_USER(state, updatedUser){
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            state.users.splice(index, 1, updatedUser);
        }
    },
    REMOVE_USER(state, userId){
        state.users = state.users.filter(user => user.id !== userId);
    }
}

const actions = {
    async setUsers({commit}){
        try {
            const data = await userService.getUsersPerPage();
            commit('SET_USERS', data.users)
        }catch (error) {
            console.error(error)
        }
    },
    async addUser({commit}, user){
        try {
            const newUser = await userService.addUser(user);
            commit('ADD_USER', newUser);
        } catch (error) {
            console.error(error)
        }
    },
    async updateUser({commit}, user){
        try {
            const updatedUser = await userService.updateUser(user);
            commit('UPDATE_USER', updatedUser);
        } catch (error) {
            console.error(error)
        }
    },
    async deleteUser({commit}, user){
        try {
            await userService.deleteUser(user);
            console.log(user)
            commit('REMOVE_USER', user.id);
        } catch (error) {
            console.error(error)
        }
    }
}

const getters = {
    getUsers(state){
        return state.users;
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}