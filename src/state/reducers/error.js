const errorReducer = (state = "", action) => {
    switch (action.type) {
        case "GET_ERROR_DATA":
            return action.payload
        case "SET_ERROR_DATA":
            return action.payload
        default:
            return state
    }
}

export default errorReducer;