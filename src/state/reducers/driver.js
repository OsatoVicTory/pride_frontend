const driverReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_DRIVER_DATA":
            return state
        case "SET_DRIVER_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "REMOVE_DRIVER_DATA":
            return action.payload
        default:
            return state
    }
}

export default driverReducer;