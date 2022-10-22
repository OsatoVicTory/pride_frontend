import React, { useState, useEffect } from 'react';
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions } from "../../state";
import { signupUser } from '../../Services/authServices/authServices';
import LoadingSpinner from "../../components/loading/loading";
import logo from "../../imgs/logo.jpg";
import MessagePrompt from '../../components/messagePrompt/MessagePrompt';

const SignupPage = () => {

    const [input, setInput] = useState({});
    const navigate = useNavigate();
    const [position, setPosition] = useState("middle");
    const [loading, setLoading] = useState(false);
    const [sticky, setSticky] = useState(false);
    const inputsKeys = ["firstName","lastName","email","phoneNumber","password"];
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const message = useSelector(state => state.message);
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

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const inputsUnfilled = inputsKeys.find(objKey => !input[objKey]);
        if(!inputsUnfilled) setPosition("middle");
    }, [input]);

    const handleHover = () => {
        if(window.innerWidth < 1000) return setPosition("middle");
        if(input.email && input.password) setPosition("middle");
        else {
            if(position==="left") setPosition("right");
            else setPosition("left");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // setTimeout(() => { setLoading(false) }, 2000);
        // return;
        signupUser(input).then(res => {
            setLoading(false);
            if(res.data.status === "failed") return setErrorData(res.data.message);

            if(res.data.message) setMessageData(res.data.message);
            setTimeout(() => {
                navigate(`/verify-account/${res.data.token}`)
            }, 1000);
        }).catch(err => {
            setLoading(false);
            setErrorData(err.response?.data.message||err.message);
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= 45) setSticky(true);
            else setSticky(false);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="signup">
            <MessagePrompt type={textType} text={message?message:error} />
            <div className="signup__Content">
                <div className={`signup__Top ${sticky?"sticky":""}`}>
                    <img src={logo} />
                    <div className="lT__Left">
                        <div onClick={() => navigate("/login")}>Sign in</div>
                        <a href="https://www.linkedin.com/in/osatohanmen-ogbeide-94377719a" 
                        className="founder">Founder</a>
                    </div>
                </div>
                <div className="signup__Main">
                    <div className="sM__Content">
                        <h1>Create Your Account</h1>
                        <span className="signup__Med"
                        style={{textAlign: "center"}}>
                            Hey, Enter your details to become a PROUD rider
                        </span>
                        <form onSubmit={handleSubmit}>
                            <input placeholder="Enter First Name" required
                            name="firstName" onChange={handleChange} />
                            <input placeholder="Enter Last Name" required
                            name="lastName" onChange={handleChange} />
                            <input placeholder="Enter Phone Number" type="number" required
                            name="phoneNumber" onChange={handleChange} />
                            <input placeholder="Enter Email" required type="email"
                            name="email" onChange={handleChange} />
                            <input placeholder="Enter password" required 
                            name="password" type="password" onChange={handleChange} />
                            <div className={`signup__Button ${position}`}
                            onMouseEnter={handleHover} onMouseLeave={() => setPosition(position)}>
                                {!loading ?
                                    <input type="submit" value="Sign up" /> :
                                    <LoadingSpinner width={"14px"} height={"14px"} />
                                }
                            </div>
                        </form>
                        <div className="requestSignup">
                            <span>Already have an account</span>
                            <span className="signup__SmallThick cursor"
                            onClick={() => navigate("/login")}>
                                Log in
                            </span>
                        </div>
                    </div>
                </div>
                {/* <span className="signup__Small">
                    Copyright @ PRIDE {new Date().getFullYear()}
                </span> */}
            </div>
        </div>
    )
}
export default SignupPage;
