import React, { useState } from "react";
import "./Profile.css";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions, errorActions, messageActions } from "../../state/index";
import { resetPassword } from "../../Services/authServices/authServices";
import avatar from "../../imgs/avatar.png";


const PasswordReset = () => {

    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const { setUserData } = bindActionCreators(userActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const sendData = async () => {
        // const res = await server
        setLoading(true);
        if(!userDetails.oldPassword||!userDetails.password||!userDetails.confirmPassword) {
            setLoading(false);
            setErrorData("Provide Values For The Empty Field(s)");
        }
        else if(userDetails.password!==userDetails.confirmPassword) {
            setLoading(false);
            setErrorData("Password Don't Match");
        } else {
            const sendData = {...user, ...userDetails};
            
            resetPassword(sendData).then(res => {
                setLoading(false);
                if(res.data.status === "failed") return setErrorData(res.data.message);

                if(res.data.message) setMessageData(res.data.message);
                setUserData(res.data.user);
            }).catch(err => {
                setLoading(false);
                setErrorData(err.response?.data.message||err.message);
            })
        }
    }

    const getImageUrl = () => user.img===""||!user.img ? avatar : user.img;

    return (
        <div className="profile__Content">
            <div className="profile__Img">
                <img src={getImageUrl()} />
            </div>
            <div className="profile__Form">
                <h1>Edit Your Profile</h1>
                <form>
                    <div className="profile__Input">
                        <span>Enter Your Old Password</span>
                        <input placeholder="Enter Old Password" required
                        name="oldPassword" type="password" onChange={handleChange} />
                    </div>
                    <div className="profile__Input">
                        <span>Enter Your New Password</span>
                        <input placeholder="Enter New Password" required
                        type="password" name="password" onChange={handleChange} />
                    </div>
                    <div className="profile__Input">
                        <span>Confirm Your New Password</span>
                        <input placeholder="Confirm New Password" required
                        name="confirmPassword" type="password" onChange={handleChange} />
                    </div>
                    <div className="profile__Bottom">
                        <Button label={"Update"} handleClick={sendData} loading={loading} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset;