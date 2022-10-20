export const setHotelData = (hotelData) => {
    return (dispatch) => {
        dispatch({
            type: "SET_HOTEL_DATA",
            payload: hotelData
        })
    }
}

export const getHotelData = (hotelData) => {
    return (dispatch) => {
        dispatch({
            type: "GET_HOTEL_DATA",
            payload: hotelData
        })
    }
}