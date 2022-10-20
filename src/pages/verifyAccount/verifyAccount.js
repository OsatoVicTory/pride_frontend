import React, { useState, useEffect } from "react";
import "./verifyAccount.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions } from "../../state";
import { verifyAccount } from "../../Services/authServices/authServices";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loading/loading";
import MessagePrompt from "../../components/messagePrompt/MessagePrompt";

const VerifyAccount = () => {

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

        verifyAccount(token).then(res => {
            setLoading(false);
            if(res.data.status === "failed") return setErrorData(res.data.message);

            if(res.data.message) setMessageData(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }).catch(err => {
            setLoading(false);
            setErrorData("Sorry Something Went Wrong. Check Internet Connection");
        })
    }

    return (
        <div className="verifyAccount">
            <MessagePrompt type={textType} text={message?message:error} />
            <div className="vA__Top">
                <h1>PRIDE</h1>
            </div>
            <div className="vA__Content">
                <h1>Verify Your Account</h1>
                <span className="vA__Span">
                    Weldone, All you need to do now is verify your account.
                    Click the button below to do so and get off to a flying start
                </span>
                <div className="vA__Button" onClick={handleVerify}>
                    {!loading ? 
                        <span>Verify Account</span> :
                        <LoadingSpinner width={"20px"} height={"20px"} />
                    } 
                </div>
            </div>
            <span className="vA__Med">
                Copyright @ PRIDE {new Date().getFullYear()}
            </span>
        </div>
    )
}

export default VerifyAccount;