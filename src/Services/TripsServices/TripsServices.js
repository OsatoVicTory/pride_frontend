import axios from "axios";

const SERVER = "https://pride-app.herokuapp.com";

const options = {
    withCredentials: true
};

//for cash payment, just only save as trips
export const removeTrip = async (data) => {
    const { id, cost } = data;
    return await axios.get(`${SERVER}/trips/${id}/${cost}`, options);
}

export const getTrips = async () => {
    return await axios.get(`${SERVER}/trips`, options);
}