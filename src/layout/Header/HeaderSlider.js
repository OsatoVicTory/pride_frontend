import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderSlider.css";
import headerData from "./headerData";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions, rideActions, driverActions, walletActions } from "../../state";
import { logoutUser } from "../../Services/authServices/authServices";

const HeaderSlider = ({ show, toggleSlider }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const { removeRideData } = bindActionCreators(rideActions, dispatch);
    const { removeDriverData } = bindActionCreators(driverActions, dispatch);
    const { removeWalletData } = bindActionCreators(walletActions, dispatch);

    const headerDropdownRoute = (val) => {
        if(val.link === "/login") {
            logoutUser().then(res => {
                if(res.data.status === "failed") return setErrorData(res.data.message);

                if(res.data.message) setMessageData(res.data.message);
                removeWalletData({});
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
        toggleSlider();
    }
    return (
        <div className={`header__Routes__Slider ${show}`}
        style={{transform: `translateX(${show?"0%":"100vw"})`}}>
            <div className="hRS__Wrapper">
                <div className="hRS__Top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                    onClick={toggleSlider}
                    strokeLinejoin="round" className="x" style={{color: "black"}}>
                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <div className="hRS__Main">
                    <ul>
                        {headerData.headerDropdown.map((val, idx) => (
                            <li key={`hRS-${idx}`} className="hRS__Links"
                            onClick={() => headerDropdownRoute(val)}>
                                {val.svg}
                                <span>{val.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeaderSlider;