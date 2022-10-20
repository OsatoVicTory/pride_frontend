import React,{ useState, useRef, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Card from "../Card/Card";
import WalletCardForm from "../WalletCardForm/WalletCardForm";
import "./Wallet.css";
import avatar from "../../../imgs/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions, walletActions } from "../../../state";
import { getWallet } from "../../../Services/WalletServices/WalletServices";
import { logoutUser } from "../../../Services/authServices/authServices";
import LoadingSpinner from "../../../components/loading/loading";



const Wallet = () => {

    const wallet = useSelector(state => state.wallet);
    const user = useSelector(state => state.user);
    const [state, setState] = useState(wallet);
    const [setUpStart, setSetUpStart] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const [pageLoaded, setPageLoaded] = useState(false);
    const dispatch = useDispatch();
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const { setWalletData } = bindActionCreators(walletActions, dispatch);

    const handleClick = (e) => {
        if(profileRef.current) {
            if(!profileRef.current.contains(e.target)) setShowDropdown(false);
        }
    }

    useEffect(() => {
        getWallet().then(res => {
            setPageLoaded(true);
            if(res.data.status === "failed") return setErrorData(res.data.message);

            if(res.data.message) setMessageData(res.data.message);
            setWalletData(res.data.wallet);
            setState(res.data.wallet);
        }).catch(err => {
            setPageLoaded(true);
            setErrorData(err.response?.data.message||err.message);
        })
    }, []);

    const handleLogout = () => {
        logoutUser().then(res => {
            if(res.data.status === "failed") return setErrorData(res.data.message);

            if(res.data.message) setMessageData(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }).catch(err => {
            console.log(err);
            setErrorData(err.response?.data.message||err.message)
        })
    }

   
    if(!pageLoaded) {
        return (
            <div className="Wallet">
                <div className="Wallet__PageLoader">
                    <LoadingSpinner width={"100px"} height={"100px"} />
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="Wallet" onClick={handleClick}>
                <div className="Wallet__Top">
                    <h1>pRide Wallet</h1>
                    <div className="wallet__Profile" ref={profileRef}>
                        <div className="wallet__Profile_div">
                            <img src={user.img||avatar} />
                            <div onClick={() => setShowDropdown(!showDropdown)}>
                                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0" fill="none" width="24" height="24"/>
                                    <g><path d="M7 10l5 5 5-5"/></g>
                                </svg>
                            </div>
                        </div>
                        <div className={`wallet__Dropdown ${showDropdown}`}>
                            <div className="wallet__Dropdown__Content">
                                <ul className="wallet__Dropdown__ul">
                                    <li className="wD__Divs" onClick={() => navigate("/app/profile")}
                                    style={{borderBottom: "1px solid #e2e8f0"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{color: "black"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6">
                                        <circle cx="12" cy="7" r="4" className="sc-htoDjs dXGcZC mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6"></circle>
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" className="sc-gzVnrw iLnVEa mb-1 md:my-4 md:mr-2 text-lg w-6 h-6 md:w-6 md:h-6"></path>
                                        </svg>
                                        <span>Profile Settings</span>
                                    </li>
                                    <li className="wD__Divs" onClick={handleLogout}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" 
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="feather feather-log-out" 
                                        style={{color: "black", marginRight: "5px"}}>
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        <span>Log Out</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Wallet__Cash">
                    <span className="Wallet__Small">Uber {wallet.cardNumber?"Card":"Cash"}</span>
                    <span className="Wallet__Big">{wallet.cardAmount||"0.00"}</span>
                </div>
                <div className="Wallet__Card">
                    <div className="card__Wrapper">
                        <div className="rotator">
                            <span>Card</span>
                            <span onClick={() => setShowBack(!showBack)}
                            style={{marginLeft: "50px", cursor: "pointer"}}>Rotate</span>
                        </div>
                        <Card state={state} showBack={showBack} />
                    </div>
                </div>
                <div className="Wallet__SetUp" onClick={() => setSetUpStart(!setUpStart)}>
                    <span>+</span>
                    <span>Set up Card</span>
                </div>
                {setUpStart && <WalletCardForm state={state} setState={setState} setShowBack={setShowBack} />}
            </div>
        )
    }
}

export default Wallet;