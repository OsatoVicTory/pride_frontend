import React, { useState, useEffect } from 'react';
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions, userActions } from "../../state";
import { loginUser } from '../../Services/authServices/authServices';
import LoadingSpinner from "../../components/loading/loading";
import SVGs from "../../imgs/SVGs";
import logo from "../../imgs/logo.jpg";
import MessagePrompt from '../../components/messagePrompt/MessagePrompt';

const LogInPage = () => {

    const [input, setInput] = useState({});
    const navigate = useNavigate();
    const [position, setPosition] = useState("middle");
    const [loading, setLoading] = useState(false);
    const [sticky, setSticky] = useState(false);
    const error = useSelector(state => state.error);
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const { setUserData } = bindActionCreators(userActions, dispatch);
    const [textType, setTextType] = useState(null);
    const SERVER = "https://pride-app.herokuapp.com";

    useEffect(() => {
        if(input.email && input.password) setPosition("middle");
    }, [input])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleHover = () => {
        if(window.innerWidth < 1000) return setPosition("middle");
        if(input.email && input.password) setPosition("middle");
        else {
            if(position==="left") setPosition("right");
            else setPosition("left");
        }
    }

    const handleOpen = (provider) => {
        window.open(`${SERVER}/auth/${provider}`, "_self");
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

        loginUser(input).then(res => {
            setLoading(false);
            if(res.data.status === "failed") {
                setErrorData(res.data.message);
                setTimeout(() => {
                    navigate(`/verify-account/${res.data.token}`)
                }, 1000);
                return;
            }

            if(res.data.message) setMessageData(res.data.message);
            setUserData(res.data.user);
            navigate("/app/rides");
        }).catch(err => {
            setLoading(false);
            setErrorData(err.response?.data.message||err.message);
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY)
            if(window.scrollY >= 20) setSticky(true);
            else setSticky(false);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="login">
            <MessagePrompt type={textType} text={message?message:error} />
            <div className="login__Content">

                <div className={`login__Top ${sticky?"sticky":""}`}>
                    <img src={logo} />
                    <div className="lT__Left">
                        <div onClick={() => navigate("/signup")}>Sign up</div>
                        <a href="https://www.linkedin.com/in/osatohanmen-ogbeide-94377719a" 
                        className="founder">Founder</a>
                    </div>
                </div>
                <div className="login__Main">
                    <div className="lM__Content">
                        <h1>Login To Your Account</h1>
                        <span className="login__Med"
                        style={{textAlign: "center"}}>
                            Hey, Enter your details to get signed into your account
                        </span>
                        <form onSubmit={handleSubmit}>
                            <input placeholder="Enter Email" required
                            name="email" onChange={handleChange} />
                            <input placeholder="Enter password" required 
                            name="password" type="password" onChange={handleChange} />
                            <span className="login__Small cursor"
                            onClick={() => navigate("/password-recovery")}>
                                Having trouble signing in?
                            </span>
                            <div className={`login__Button ${position}`}
                            onMouseEnter={handleHover} onMouseLeave={() => setPosition(position)}>
                                {/* <Button label={"Sign in"} loading={loading} 
                                handleClick={handleSubmit} /> */}
                                {!loading ?
                                    <input type="submit" value="Sign in" /> :
                                    <LoadingSpinner width={"14px"} height={"14px"} />
                                }
                            </div>
                        </form>
                        <span className="login__Small">
                            --Or Sign in with --
                        </span>
                        <div className="login__Providers">
                            <div onClick={() => handleOpen("google")}>
                                {SVGs.google}
                                <span className="login__SmallThick">Google</span>
                             </div>
//                              <div onClick={() => handleOpen("LinkedIn")}>
//                                  {SVGs.linkedIn}
//                                  <span className="login__SmallThick">LinkedIn</span>
//                             </div>
                        </div>
                        <div className="requestSignup">
                            <span>Don't have an account</span>
                            <span className="login__SmallThick cursor"
                            onClick={() => navigate("/signup")}>
                                Become a Proud Rider
                            </span>
                        </div>
                    </div>
                </div>
                {/* <span className="login__Small">
                    Copyright @ PRIDE {new Date().getFullYear()}
                </span> */}
            </div>
        </div>
    )
}
export default LogInPage;
