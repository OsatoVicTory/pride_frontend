const hotelReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_HOTEL_DATA":
            return state
        case "SET_HOTEL_DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default hotelReducer;