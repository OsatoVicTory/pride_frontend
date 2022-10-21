import React, { useState, useEffect } from 'react';
import "./passwordRecovery.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions } from "../../state";
import LoadingSpinner from "../../components/loading/loading";
import { forgotPassword } from '../../Services/authServices/authServices';
import MessagePrompt from '../../components/messagePrompt/MessagePrompt';

//password recovery was fancy name for backend forgot password
//as password recovery would sound better to people than forgot password
const PasswordRecovery = () => {

    const [input, setInput] = useState({});
    const navigate = useNavigate();
    const [position, setPosition] = useState("middle");
    const [loading, setLoading] = useState(false);
    const error = useSelector(state => state.error);
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const [textType, setTextType] = useState(null);

    useEffect(() => {
        if(input.email && input.password && input.confirmPassword) setPosition("middle");
    }, [input])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleHover = () => {
        if(input.email && input.password && input.confirmPassword) setPosition("middle");
        else {
            if(position==="left") setPosition("right");
            else setPosition("left");
        }
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // setTimeout(() => { setLoading(false) }, 2000);
        // return;
        forgotPassword(input).then(res => {
            setLoading(false);
            if(res.data.status === "failed") return setErrorData(res.data.message);

            if(res.data.message) setMessageData(res.data.message);
            setTimeout(() => {
                navigate(`/password-recovery-update/${res.data.token}`)
            }, 1000);
        }).catch(err => {
            setLoading(false);
            setErrorData(err.response?.data.message||err.message);
        })
    }

    return (
        <div className="passwordRecovery">
            <MessagePrompt type={textType} text={message?message:error} />
            <div className="passwordRecovery__Content">
                <div className={`passwordRecovery__Top`}>
                    <h1>PRIDE</h1>
                    <div className="lT__Left">
                        <div>Sign up</div>
                        <div className="founder">Founder</div>
                    </div>
                </div>
                <div className="passwordRecovery__Main">
                    <div className="prM__Content">
                        <h1>Retrieve Password</h1>
                        <span className="passwordRecovery__Med"
                        style={{textAlign: "center"}}>
                            Hey, Enter your details to get retrieve a new password
                        </span>
                        <form onSubmit={handleSubmit}>
                            <input placeholder="Enter Email" required
                            name="email" type="email" onChange={handleChange} />
                            <input placeholder="Enter New password" required 
                            name="password" type="password" onChange={handleChange} />
                            <input placeholder="Confirm New password" required 
                            name="confirmPassword" type="password" onChange={handleChange} />
                            <div className={`passwordRecovery__Button ${position}`}
                            onMouseEnter={handleHover} onMouseLeave={() => setPosition(position)}>
                               
                                {!loading ?
                                    <input type="submit" value="Recover" /> :
                                    <LoadingSpinner width={"14px"} height={"14px"} />
                                }
                            </div>
                        </form>
                        <div className="requestSignup">
                            <span>Just remembered your password</span>
                            <span className="passwordRecovery__SmallThick cursor">
                                Log in now
                            </span>
                        </div>
                    </div>
                </div>
                <span className="passwordRecovery__Small">
                    Copyright @ PRIDE {new Date().getFullYear()}
                </span>
            </div>
        </div>
    )
}
export default PasswordRecovery;