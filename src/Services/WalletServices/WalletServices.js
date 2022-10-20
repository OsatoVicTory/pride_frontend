import axios from "axios";

const options = {
    withCredentials: true
};

const SERVER = "http://localhost:5000";

export const setUpWallet = async (data) => {
    return await axios.post(`${SERVER}/wallet`, data, options);
}

export const getWallet = async () => {
    return await axios.get(`${SERVER}/wallet`, options);
}