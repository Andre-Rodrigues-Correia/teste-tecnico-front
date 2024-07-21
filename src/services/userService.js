import axios from "axios";

const BASE_URL = 'https://reqres.in';

const userService = {

    createUser: async function (user) {
        try {
            const response = await axios.post(`${BASE_URL}/api/register`, user);
            return response.data;
        } catch (error) {
            console.error('Error in createUser');
            throw error
        }
    },

    getAllUsers: async function () {
        try {
            const response = await axios.get(`${BASE_URL}/api/unknown`, {params: {
                    per_page: 20
                }});
            return response.data.data;
        } catch (error) {
            console.error('Error in getAllUsers');
            throw error
        }
    },
    getUsersPerPage: async function () {
        try {
            const response = await axios.get(`${BASE_URL}/api/users`, {
                params: {
                    page: 1,
                    per_page: 20,
                },
            });
            return {
                users: response.data.data,
            };
        } catch (error) {
            console.error('Error in getUsersPerPage');
            throw error;
        }
    },

    addUser: async function (user) {
        try {
            const response = await axios.post(`${BASE_URL}/api/users`, user);
            return response.data;
        } catch (error) {
            console.error('Error in createUser');
            throw error
        }
    },

    updateUser: async function (user) {
        try {
            const response = await axios.put(`${BASE_URL}/api/users/${user.id}`, user);
            return response.data;
        } catch (error) {
            console.error('Error in createUser');
            throw error
        }
    },
    deleteUser: async function (user) {
        try {
            const response = await axios.delete(`${BASE_URL}/api/users/${user.id}`);
            return response.data;
        } catch (error) {
            console.error('Error in createUser');
            throw error
        }
    }
}



export default userService;