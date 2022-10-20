const messageReducer = (state = "", action) => {
    switch (action.type) {
        case "GET_MESSAGE_DATA":
            return action.payload
        case "SET_MESSAGE_DATA":
            return action.payload
        default:
            return state
    }
}

export default messageReducer;