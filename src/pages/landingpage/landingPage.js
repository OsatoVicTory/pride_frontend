import React from "react";
import "./landingPage.css";
import { useNavigate } from "react-router-dom";
import logo from "../../imgs/logo.jpg";

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className="landingPage">
            <div className="landingPage__Top">
                <img src={logo} />
            </div>
            <div className="landingPage__Main">
                <h1>Welcome to pRIDE App</h1>
                <div className="landingPage__Txt">
                    This App works like Uber only that here you don't really
                    make real payments but virtual ones and you wont eventually meet 
                    any driver so don't get your hope high.
                    This also works great for continued sessions as page refresh or reload dont
                    loose current route and state. 
                    But note cancellation of ride or reloading of /finddriver or 
                    /meetdriver pages would loose 
                    not ride state but driver state as you can't keep driver waiting on you. So if you loading those pages 
                    it is essential that you 
                    attend to all you need to there without a page refresh or reload
                </div>
                <div className="landingPage__Buttons"
                style={{marginTop: "20px"}}
                onClick={() => navigate("/login")}>
                    Log In
                </div>
                <div className="landingPage__Buttons"
                onClick={() => navigate("/signup")}>
                    Sign Up
                </div>
            </div>
            <span className="landingPage__Txt">
                Copyright @ pRIDE {new Date().getFullYear()}
            </span>
        </div>
    )
}

export default LandingPage;