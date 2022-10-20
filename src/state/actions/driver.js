export const setDriverData = (driverData) => {
    return (dispatch) => {
        dispatch({
            type: "SET_DRIVER_DATA",
            payload: driverData
        })
    }
}

export const getDriverData = (driverData) => {
    return (dispatch) => {
        dispatch({
            type: "GET_DRIVER_DATA",
            payload: driverData
        })
    }
}
export const removeDriverData = (driverData) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_DRIVER_DATA",
            payload: driverData
        })
    }
}