const walletReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_WALLET_DATA":
            return state
        case "SET_WALLET_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "REMOVE_WALLET_DATA":
            return action.payload
        default:
            return state
    }
}

export default walletReducer;