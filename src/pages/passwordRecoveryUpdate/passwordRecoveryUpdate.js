import React, { useState, useEffect } from "react";
import "./passwordRecoveryUpdate.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions } from "../../state";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loading/loading";
import { forgotPasswordUpdate } from "../../Services/authServices/authServices";
import MessagePrompt from '../../components/messagePrompt/MessagePrompt';

//password recovery was fancy name for backend forgot password
//as password recovery would sound better to people than forgot password
const PasswordRecoveryUpdate = () => {

    const navigate = useNavigate();
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const error = useSelector(state => state.error);
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const [textType, setTextType] = useState(null);

    
    useEffect(() => {
        if(error && error!=="") {
            setTextType("error");
            setTimeout(() => {
                setErrorData(null);
                setTextType(null)
            }, 2000);
        }

        if(message && message!=="") {
            setTextType("message");
            setTimeout(() => {
                setMessageData(null);
                setTextType(null)
            }, 2000);
        }
    }, [error, message]);

    const handleVerify = () => {
        setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        //     navigate("/login");
        // }, 2000);

        // return;
        forgotPasswordUpdate(token).then(res => {
            setLoading(false);
            if(res.data.status === "failed") return setErrorData(res.data.message);

            if(res.data.message) setMessageData(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }).catch(err => {
            setLoading(false);
            setErrorData("Sorry Something Went Wrong. Check Internet Connection");
        });
    }

    return (
        <div className="passwordRecoveryUpdate">
            <MessagePrompt type={textType} text={message?message:error} />
            <div className="pRU__Top">
                <h1>PRIDE</h1>
            </div>
            <div className="pRU__Content">
                <h1>Change Your Password</h1>
                <span className="pRU__Span">
                    Alright, All you need to do now is finalize your password change.
                    Click the button below to do so now
                </span>
                <div className="pRU__Button" onClick={handleVerify}>
                    {!loading ? 
                        <span>Change Password</span> :
                        <LoadingSpinner width={"20px"} height={"20px"} />
                    } 
                </div>
            </div>
            <span className="pRU__Med">
                Copyright @ PRIDE {new Date().getFullYear()}
            </span>
        </div>
    )
}

export default PasswordRecoveryUpdate;