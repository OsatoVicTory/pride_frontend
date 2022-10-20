const rideReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_RIDES_DATA":
            return state
        case "SET_RIDE_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "REMOVE_RIDE_DATA":
            return action.payload;
        default:
            return state
    }
}

export default rideReducer;