import axios from "axios";

const BASE_URL = 'https://reqres.in';

const userService = {

    createUser: async function (user) {
        try {
            const response = await axios.post(`${BASE_URL}/api/register`, user);
            return response.data;
        } catch (error) {
            console.error('Error in login');
            throw error
        }
    },
}

export default userService;