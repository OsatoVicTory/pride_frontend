import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import "./MainApp.css";
import Rides from './pages/rides/rides';
import Activities from './pages/activity/activity.js';
import Hotel from './pages/hotel/hotel.js';
import Courier from './pages/courier/Courier';
import Wallet from './pages/wallet/Wallet/Wallet.js';
import Profile from './pages/Profile/Profile.js';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, messageActions, userActions } from "./state";
import { userLoggedIn } from './Services/authServices/authServices';
import PageSpinner from "./components/PageSpinner/PageSpinner";
import PageLayout from "./layout/PageLayout/PageLayout";
import MessagePrompt from './components/messagePrompt/MessagePrompt';
import ErrorPage from './pages/ErrorPage/ErrorPage';
// import Map from './components/MAP/Map';
import Mapbox from './components/MAP/Mapbox';

const MainApp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user?.isVerified);
    let error = useSelector(state => state.error);
    const message = useSelector(state => state.message);
    const [loading, setLoading] = useState(!user ? true : false);
    const [errorPage, setErrorPage] =useState(false);
    const [messageText, setMessageText] = useState(null);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const { setUserData } = bindActionCreators(userActions, dispatch);

    useEffect(() => {
        // console.log(error)
        if(error && error !== "") {
            setMessageText("error");
            setTimeout(() => {
                setErrorData(null);
                setMessageText(null);
            }, 4000);

            if(error === "Network Error") setErrorPage(true);
        }
        if(message && message !== "") {
            setMessageText("message");
            setTimeout(() => {
                setMessageData(null);
                setMessageText(null);
            }, 4000);

        }
    }, [error, message]);

    useEffect(() => {
        // setLoading(false);
        // return;
        if(!loading) return;

        userLoggedIn().then(res => {
            setLoading(false);
            if(res.data.status !== "success") {
                setErrorData(res.data.message);
                return;
            } 

            if(res.data.message) setMessageData(res.data.message);
            setUserData(res.data.user);
        }).catch(err => {
            setLoading(false);
            setErrorData(err.response?.data.message||err.message);
            navigate("/login");
        })
    }, []);

    if(loading) {
        return <PageSpinner />
    } 
    else if(errorPage && !user?.isVerified) {
        return <ErrorPage />
    } 
    else {
        return (
            <PageLayout>
                <div className="MainApp">
                    <div className="MainApp_content">
                        <MessagePrompt type={messageText} 
                        text={messageText==="error"?error:message} />
                        <div className="Map_content">
                            <Mapbox />
                        </div>
                        <div className="MainApp_routes">
                            <Routes>
                                <Route path='/rides/*' element={<Rides />} />
                                <Route path="/hotel/*" element={<Hotel />} />
                                <Route path="/courier/*" element={<Courier />} />
                            </Routes>
                        </div>
                        <Routes>
                            <Route path="/activities" element={<Activities />} />
                            <Route path="/wallet" element={<Wallet />} />
                            <Route path="/profile/*" element={<Profile />} />  
                        </Routes>
                    </div>
                </div>
            </PageLayout>
        )
    }
}

export default MainApp;