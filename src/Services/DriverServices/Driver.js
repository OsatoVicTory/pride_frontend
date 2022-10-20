import axios from "axios";

const SERVER = "http://localhost:5000";


const options = {
    withCredentials: true
};

export const findDriverAndBookTrip = async (ride) => {
    return await axios.post(`${SERVER}/trips`, ride, options);
}