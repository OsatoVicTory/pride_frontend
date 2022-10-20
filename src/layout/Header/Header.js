import React, { useState } from "react";
import headerData from "./headerData";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions, rideActions, driverActions, walletActions } from "../../state";
import HeaderSlider from "./HeaderSlider";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/authServices/authServices";

const Header = () => {

    const [routeSlider, setRouteSlider] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const { removeRideData } = bindActionCreators(rideActions, dispatch);
    const { removeDriverData } = bindActionCreators(driverActions, dispatch);
    const { setWalletData } = bindActionCreators(walletActions, dispatch);

    const toggleSlider = () => {
        setRouteSlider(!routeSlider);
    }

    const headerDropdownRoute = (val) => {
        if(val.link === "/login") {
            logoutUser().then(res => {
                if(res.data.status === "failed") return setErrorData(res.data.message);

                if(res.data.message) setMessageData(res.data.message);
                setWalletData({paid: false});
                removeRideData({});
                removeDriverData({});
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }).catch(err => {
                setErrorData(err.response?.data.message||err.message)
            })
        } else {
            navigate(val.link);
        }
    }

    return (
        <header>
            <div className="header__Wrapper">
                <div className="logo">pRIDE</div>
                <div className="header__Routes__Full">
                    <ul className="header__Routes__ul">
                        {headerData.headerRoutes.map((val, idx) => (
                            <li key={`headerRoutes-${idx}`}
                            onClick={() => navigate(val.link)}>
                                {val.text}
                            </li>
                        ))}
                    </ul>
                    <div className="_Profile">
                        <div className="profilePic">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: "white"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6">
                            <circle cx="12" cy="7" r="4" className="sc-htoDjs dXGcZC mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6"></circle>
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" className="sc-gzVnrw iLnVEa mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6"></path>
                            </svg>
                            <span>{user.firstName||""}</span>
                        </div>
                        <div className="header__Dropdown">
                            <div className="header__Dropdown__Content">
                                <span>Hi {user.firstName||""}</span>
                                <ul className="header__Dropdown__ul">
                                    {headerData.headerDropdown.map((val, idx) => (
                                        <li key={`headerDropdown-${idx}`}
                                        onClick={() => headerDropdownRoute(val)}>
                                            {val.svg}
                                            <span>{val.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="_Profile__Mobile">
                        <div className="avatar" onClick={toggleSlider}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: "white"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6">
                            <circle cx="12" cy="7" r="4" className="sc-htoDjs dXGcZC mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6"></circle>
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" className="sc-gzVnrw iLnVEa mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderSlider show={routeSlider} toggleSlider={toggleSlider} />
        </header>
    )
}

export default Header;