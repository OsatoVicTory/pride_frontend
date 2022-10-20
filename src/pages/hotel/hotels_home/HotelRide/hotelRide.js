import React, { useState, useEffect, useRef } from "react";
import MapModal from "../../../../components/mapModal/mapModal.js";
import "./hotelRide.css";
import HotelRideComponent from "./HotelRideComponent/HotelRideComponent";
// import image from "../../../../imgs/Black.png";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { rideActions, errorActions } from "../../../../state/index";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Allow from "../../../../components/allow/allow.js";
import { encodeURL, decodeURL } from "../../../../utils/encodeURL.js";
import { fetchPlacesSuggestions, getDistance } from "../../../../Services/MapServices/MapsServices.js";
import LoadingSpinner from "../../../../components/loading/loading.js";
import Suggestions from "../../../../components/Suggestions/Suggestions.js";
import PaymentsModal from "../../../../components/Modals/PaymentModal/PaymentsModal";
import CardForm from "../../../../components/Modals/CardForm/CardForm";
import PayModal from "../../../../components/Modals/Pay/PayModal.js";
import useDebounce from "../../../../hooks/debounce.js";
import { getTime, estimateDropoff } from "../../../../utils/rideUtils";


const HotelRide = () => {

    const dispatch = useDispatch();
    const { setRideData } = bindActionCreators(rideActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const ride = useSelector(state => state.ride);
    const [rideInputs, setRideInputs] = useState({
        pickup: null,
        destination: ride.destination
    });
    const [route, setRoute] = useState("allow");
    const [typingInput, setTypingInput] = useState(null);
    const user = useSelector(state => state.user);
    const suggestions = useDebounce(typingInput, fetchPlacesSuggestions, user.RAPID_API_KEY, setRoute, setErrorData);

    const loc = useLocation()
    const location = loc.pathname;//.split("/")[1];
    const pathSearch = loc.search;
    const navigate = useNavigate();
    const refOne = useRef(null);

    useEffect(() => {

        if(pathSearch&&pathSearch!==""&&!ride.destination) {
            const data = decodeURL(pathSearch.slice(1, pathSearch.length));
            setRideData(data);
            setRideInputs(data);
            if(refOne.current) refOne.current.value = data.pickup?.primaryAddress||"";
        }
        
    }, []);
    
    useEffect(() => {

        if(rideInputs.pickup && rideInputs.destination) {
            const distance = getDistance(rideInputs);
            const cost = Math.ceil(80 * distance);
            const time = getTime(distance);
            const dropoff = estimateDropoff(distance);
            const data = {
                ...rideInputs,
                distance,
                cost,
                time,
                dropoff,
                rideType: "hotel"
            };
            
            setRideData(data);
            setRoute("pride");
            const encode = encodeURL(data);
            navigate(`/app/hotel/ride/?${encode}`);
        }


    }, [rideInputs.pickup, ride.destination]);

    const handleChange = (e) => {
        setRoute("loading");
        setTypingInput(e.target.value);
    }

    const handleSelectedLoc = (val) => {
        setRoute("loading");
        const data = {
            ...rideInputs,
            pickup: val
        }
        setRideInputs(data);
        if(refOne.current) refOne.current.focus();
        const encode = encodeURL(data);
        setRoute("pride");
        navigate(`/app/hotel/ride/?${encode}`);
    }
    
    return (
        <MapModal>
            <div className="hotelRide_div">
                <div className="hotelRide">
                    <h1>Choose Pick up</h1>
                    <div className="inputs">
                        <input placeholder="Add a pickup location" ref={refOne}
                        name="pickup" onChange={handleChange} />
                        <div className="fakeInput">{ride.destination?.primaryAddress||"Loading..."}</div> 
                        <div className="connect_string">
                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                                <title>Circle small</title>
                                <path fillRule="evenodd" clipRule="evenodd" 
                                d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z" 
                                fill="currentColor">
                                </path>
                            </svg>
                            <div className="string"></div>
                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                            <title>Circle small</title>
                            <path fillRule="evenodd" clipRule="evenodd" 
                            d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z" 
                            fill="currentColor">
                            </path>
                        </svg>
                        </div>
                    </div>
                    <div className="leave_now" onClick={() => navigate("/app/hotel/schedule")}>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                            <title>Clock</title>
                            <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm6 13h-8V4h3v7h5v3z" 
                            fill="currentColor"></path>
                        </svg>
                        <span>Leave Now</span>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                            <title>Chevron down small</title>
                            <path d="M18 8v3.8l-6 4.6-6-4.6V8l6 4.6L18 8z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <div className="hotelRide__Scroller">
                        {route === "loading" && <div className="hotelRide__Loader">
                            <LoadingSpinner width={"50px"} height={"50px"} />
                        </div>}
                        {route === "allow" && <Allow />}
                        {route === "locations_suggestions" && 
                            <Suggestions suggestions={suggestions} 
                            handleSelectedLoc={handleSelectedLoc} />
                        }
                        {route==="pride" && <HotelRideComponent />}
                    </div>
                </div>
                <Routes>
                    <Route path="payments" element={<PaymentsModal />} />
                    <Route path="payments-setup" element={<CardForm />} />
                    <Route path="pay" element={<PayModal />} />
                </Routes>
            </div>
        </MapModal>
    )
}

export default HotelRide;