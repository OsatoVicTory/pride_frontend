import React, { useState, useEffect, useRef } from "react";
import MapModal from "../mapModal/mapModal.js";
import { Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
// import Input from "../../components/Input/Input.js";
import "./selectLocation.css";
import Allow from "../allow/allow.js";
import PrideX from "../prideX/prideX.js";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { rideActions, errorActions } from "../../state/index";
import { encodeURL, decodeURL } from "../../utils/encodeURL.js";
// import { fetchLocationSuggestions, fetchCordinates } from "../../Services/MapServices/MapServices.js";
import { fetchPlacesSuggestions, getDistance } from "../../Services/MapServices/MapsServices";
import LoadingSpinner from "../loading/loading.js";
import Suggestions from "../Suggestions/Suggestions.js";
import PaymentsModal from "../Modals/PaymentModal/PaymentsModal";
import CardForm from "../Modals/CardForm/CardForm";
import PayModal from "../Modals/Pay/PayModal.js";
import useDebounce from "../../hooks/debounce.js";
import { getTime, estimateDropoff } from "../../utils/rideUtils";

const SelectLocation = () => {
   
    const dispatch = useDispatch();
    const { setRideData } = bindActionCreators(rideActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const [focused, setFocused] = useState("pickup");
    
    const [rideInputs, setRideInputs] = useState({
        pickup: null,
        destination: null
    });
    const [currentInput, setCurrentInput] = useState("pickup");
    const [route, setRoute] = useState("allow");
    const [typingInput, setTypingInput] = useState(null);
    const user = useSelector(state => state.user);
    const suggestions = useDebounce(typingInput, fetchPlacesSuggestions, user.RAPID_API_KEY, setRoute, setErrorData);

    const loc = useLocation()
    const location = loc.pathname;//.split("/")[1];
    const pathSearch = loc.search;
    const navigate = useNavigate();
    const refOne = useRef(null);
    const refTwo = useRef(null);

    useEffect(() => {

        if(pathSearch&&pathSearch!=="") {
            const data = decodeURL(pathSearch.slice(1, pathSearch.length));
            setRideData(data);
            setRideInputs(data);
            if(refOne.current) refOne.current.value = data.pickup?.address||"";
            if(refTwo.current) refTwo.current.value = data.destination?.address||"";
        }

    }, []);

    useEffect(() => {

        if(rideInputs.pickup && rideInputs.destination) {
            const distance = getDistance(rideInputs);
            const cost = Math.ceil(80 * distance);
            const time = getTime(distance);
            const dropoff = estimateDropoff(distance);
            setRideData({
                ...rideInputs,
                distance,
                cost,
                time,
                dropoff,
                rideType: location.includes("courier") ? "courier" : "ride"
            });
            setRoute("pride");
            const encode = encodeURL(rideInputs);
            navigate(`/app/${location.includes("courier")?"courier/ride":"rides"}/?${encode}`);
        }


    }, [rideInputs.pickup, rideInputs.destination]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setRoute("loading");
        setCurrentInput(name);
        setTypingInput(value);
    }

    const handleSelectedLoc = (val) => {
        setRoute("loading");
        const data = {
            ...rideInputs,
            [currentInput] : val
        }
        setRideInputs(data);
        setRideData(data);
        if(refOne.current) {
            if(refOne.current.value === "") refOne.current.focus();
        }
        if(refTwo.current) {
            if(refTwo.current.value === "") refTwo.current.focus();
        }
        const encode = encodeURL(data);
        navigate(`/app/${location.includes("courier")?"courier/ride":"rides"}/?${encode}`);
        setRoute("allow");

    }
    
    return (
        <MapModal>
            <div className="selectLoc_div">
                <div className="selectLoc">
                    <h1>{focused==="pickup"?
                    `Where can we pick ${location.includes("courier")?"your item":"you"} up?`:
                    `Where do we drop ${location.includes("courier")?"your item":"you"} off?`}
                    </h1>
                    <div className="inputs">
                        <input placeholder="Add a pickup location" 
                        name="pickup" ref={refOne} onFocus={() => setFocused("pickup")}
                        onChange={handleChange} />
                        <input placeholder="Enter your destination" 
                        name="destination" ref={refTwo} onFocus={() => setFocused("destination")}
                        onChange={handleChange} />
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
                    {route==="allow" && <div className="leave_now"
                    onClick={() => navigate(`/app/${location.includes("courier")?"courier":"rides"}/schedule`)}>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                            <title>Clock</title>
                            <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm6 13h-8V4h3v7h5v3z" 
                            fill="currentColor"></path>
                        </svg>
                        <span style={{marginLeft: "5px"}}>Leave Now</span>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{marginLeft: "5px"}}>
                            <title>Chevron down small</title>
                            <path d="M18 8v3.8l-6 4.6-6-4.6V8l6 4.6L18 8z" fill="currentColor"></path>
                        </svg>
                    </div>}
                    <div className={`scroller ${route==="allow"}`}>
                        {route==="allow" && <Allow />}
                        {route==="loading" && <div className="spinner__Div">
                            <LoadingSpinner width={"90px"} height={"90px"} />
                        </div>}
                        {route==="locations_suggestions" && 
                            <Suggestions suggestions={suggestions} 
                            handleSelectedLoc={handleSelectedLoc} />
                        }
                        {route==="pride" && <PrideX />}
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

export default SelectLocation;