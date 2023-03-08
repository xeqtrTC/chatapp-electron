import axios from "axios";
import { newUser } from "./stateInterface";

const chatApi = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

export const registerUser = async (newUser: newUser) => {
    return await chatApi.post('/users/addUser', newUser);
}


export default chatApi