export const setMessageData = (messageData) => {
    return (dispatch) => {
        dispatch({
            type: "SET_MESSAGE_DATA",
            payload: messageData
        })
    }
}

export const getMessageData = (messageData) => {
    return (dispatch) => {
        dispatch({
            type: "GET_MESSAGE_DATA",
            payload: messageData
        })
    }
}