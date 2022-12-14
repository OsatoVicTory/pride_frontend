export const setWalletData = (walletData) => {
    return (dispatch) => {
        dispatch({
            type: "SET_WALLET_DATA",
            payload: walletData
        })
    }
}

export const getWalletData = (walletData) => {
    return (dispatch) => {
        dispatch({
            type: "GET_WALLET_DATA",
            payload: walletData
        })
    }
}

export const removeWalletData = (walletData) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_WALLET_DATA",
            payload: walletData
        })
    }
}