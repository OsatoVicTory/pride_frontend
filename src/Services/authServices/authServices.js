import axios from "axios";

const SERVER = "https://pride-app.onrender.com";

const options = {
    withCredentials: true
};
// axios.defaults.withCredentials = true;

export const loginUser = async (userData) => {
    return await axios.post(`${SERVER}/user/login`, userData, options);
};

export const userLoggedIn = async () => {
    return await axios.get(`${SERVER}/user/user-logged-in`, options);
};

export const signupUser = async (userData) => {
    return await axios.post(`${SERVER}/user/signup`, userData, options);
};

export const verifyAccount = async (token) => {
    return await axios.get(`${SERVER}/user/verify-account/${token}`, options);
};

//password recovery was fancy name for backend forgot password
//as password recovery would sound better to people than forgot password
export const forgotPassword = async (userData) => {
    return await axios.post(`${SERVER}/user/forgot-password`, userData, options);
};

export const forgotPasswordUpdate = async (token) => {
    return await axios.get(`${SERVER}/user/forgot-password-update/${token}`, options);
}

export const resetPassword = async (passwordData) => {
    return await axios.post(`${SERVER}/user/reset-password`, passwordData, options);
}

export const editProfile = async (userData) => {
    let sendData = userData;
    try {
        if(typeof userData.img == 'object') {
            const response = await axios.get(`${SERVER}/cloudinary`, options);
            const { data } = response.data
            const url = `https://api.cloudinary.com/v1_1/${data.cloudName}/auto/upload`;
            const formData = new FormData();
            formData.append("file", userData.img);
            formData.append("api_key", data.apiKey);
            formData.append("timestamp", data.timestamp);
            formData.append("signature", data.signature);
            const imgUrl = await axios.post(url, formData);

            sendData["img"] = imgUrl.data.url;
        } else {
            sendData["img"] = userData?.img||"";
        }

        const res = await axios.post(`${SERVER}/user/update`, sendData, options);
        return res;
    } catch (err) {
        return {
            data: {
                status: 'failed',
                message: err.message==="Network Error" ? err.message : 'Sorry Something Went Wrong. Check Internet and Try Again'
            }
        }
    }
}

export const logoutUser = async () => {
    return await axios.get(`${SERVER}/user/logout`, options);
}
