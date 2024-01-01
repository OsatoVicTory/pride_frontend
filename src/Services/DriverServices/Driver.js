import axios from "axios";

const SERVER = "https://pride-app.onrender.com";


const options = {
    withCredentials: true
};

export const findDriverAndBookTrip = async (ride) => {
    return await axios.post(`${SERVER}/trips`, ride, options);
}
