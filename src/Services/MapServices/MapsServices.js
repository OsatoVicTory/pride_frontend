import axios from "axios";


const SERVER = "https://pride-app.herokuapp.com";

const options = {
    withCredentials: true
};

export const getDistance = (rideCordinates) => {
    const { pickup, destination } = rideCordinates;
    const lat1 = (pickup.coordinates.lat)/57.29577951;
    const lat2 = (destination.coordinates.lat)/57.29577951;
    const lon1 = (pickup.coordinates.lng)/57.29577951;
    const lon2 = (destination.coordinates.lng)/57.29577951;

    const dlat = Math.max(lat1, lat2) - Math.min(lat2, lat1);
    const dlon = Math.max(lon2, lon1) - Math.min(lon1, lon2);

    //Haversine formula
    const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;
    //in km
    return (c * r);
}


export const fetchPlacesSuggestions = async (input, key) => {
    const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
        params: {q: input, locale: 'en_US', langId: '10033'},
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
    }

    const response = await axios.request(options);
    const Data = response.data.sr.map(hotel => {
        const { coordinates, regionNames, gaiaId, cityId } = hotel;
        return {
            status: "success",
            coordinates: {
                lat: coordinates.lat,
                lng: coordinates.long
            },
            id: gaiaId||cityId,
            primaryAddress: regionNames.primaryDisplayName,
            secondaryAddress: regionNames.secondaryDisplayName,
            address: regionNames.fullName,
            neighbourhood: regionNames.secondaryDisplayName.split(",")[0]
        }
    });
    return Data;
}

export const authorizeUserAndGetApiKey = async (user) => {
    return await axios.get(`${SERVER}/map/${user.role}`, options);
}