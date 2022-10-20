export const setErrorData = (errorData) => {
    return (dispatch) => {
        dispatch({
            type: "SET_ERROR_DATA",
            payload: errorData
        })
    }
}

export const getErrorData = (errorData) => {
    return (dispatch) => {
        dispatch({
            type: "GET_ERROR_DATA",
            payload: errorData
        })
    }
}