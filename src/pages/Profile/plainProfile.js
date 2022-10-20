import React, { useState } from "react";
import "./Profile.css";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions, errorActions, messageActions } from "../../state/index";
import { editProfile } from "../../Services/authServices/authServices";
import avatar from "../../imgs/avatar.png";
import SVGs from "../../imgs/SVGs";


const PlainProfileEdit = () => {

    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state);
    const error = useSelector(state => state.error);
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

    const userDetailsIsNotFilled = () => {
        return ["email","name","phoneNumber"].find(key => !userDetails[key] && !user[key]);
    }
    const sendDataFunc = () => {
        // const res = await await server
        setLoading(true);
        if(userDetailsIsNotFilled()) {
            setLoading(false);
            setErrorData("Provide Values For The Empty Field(s)");
        } else {
            // setLoading(false);
            // return;
            const sendData = {
                firstName: userDetails.name.split(" ")[1]||user.firstName,
                lastName: userDetails.name.split(" ")[0]||user.lastName,
                email: userDetails.email||user.email,
                phoneNumber: userDetails.phoneNumber || user.phoneNumber,
                img: userDetails.img||user.img
            }
            editProfile(sendData).then(res => {
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

    const getImageUrl = () => {
        if(userDetails.img) return URL.createObjectURL(userDetails.img);
        return user.img===""||!user.img ? avatar : user.img;
    }

    return (
        <div className="profile__Content">
            <div className="profile__Img">
                <img src={getImageUrl()} />
                <label htmlFor="input">
                    <div className="edit__Profile">{SVGs.editImg}</div>
                </label>
                <input type="file" id="input" 
                onChange={(e) => setUserDetails({...userDetails, img: e.target.files[0]})} />
            </div>
            <div className="profile__Form">
                <h1>Edit Your Profile</h1>
                <form>
                    <div className="profile__Input">
                        <span>Profile Name</span>
                        <input placeholder={user.firstName?(user.firstName +" "+ user.lastName):"Enter Full Name, surname First"}
                        name="name" onChange={handleChange} />
                    </div>
                    <div className="profile__Input">
                        <span>Phone Number</span>
                        <input placeholder={user.phoneNumber||"Enter Phone Number"} 
                        type="number" name="phoneNumber" onChange={handleChange} />
                    </div>
                    <div className="profile__Input">
                        <span>Email Address</span>
                        <input placeholder={user.email||"Enter Email Address"}
                        type="email" name="email" onChange={handleChange} />
                    </div>
                    {/* <div className="profile__Input">
                        <span>Card Expiry Date</span>
                        <input placeholder="Enter Card Expiry Date" type="number" />
                    </div> */}
                    <div className="profile__Bottom">
                        <Button label={"Update"} handleClick={sendDataFunc} loading={loading} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PlainProfileEdit;
