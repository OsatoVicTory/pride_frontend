export const setRideData = (rideData) => {
    return (dispatch) => {
        dispatch({
            type: "SET_RIDE_DATA",
            payload: rideData
        })
    }
}

export const getRideData = (rideData) => {
    return (dispatch) => {
        dispatch({
            type: "GET_RIDE_DATA",
            payload: rideData
        })
    }
}
export const removeRideData = (rideData) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_RIDE_DATA",
            payload: rideData
        })
    }
}