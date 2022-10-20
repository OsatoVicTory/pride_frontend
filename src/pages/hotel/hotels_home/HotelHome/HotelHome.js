import React, { useState, useEffect } from "react";
import MapModal from "../../../../components/mapModal/mapModal.js";
import { useNavigate } from "react-router-dom";
// import Input from "../../components/Input/Input.js";
import "./HotelHome.css";
import Allow from "../../../../components/allow/allow.js";
import LoadingSpinner from "../../../../components/loading/loading.js";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { hotelActions, errorActions, rideActions } from "../../../../state/index";
import Suggestions from "../../../../components/Suggestions/Suggestions.js";
import { fetchHotelSuggestions, fetchHotelDetails, fetchDummy, fetchPlacesSuggestions } from "../../../../Services/HotelServices/HotelServices.js";
import HotelComponent from "./HotelHomeComponents/HotelComponent/HotelComponent.js";
import HotelSuggestions from "./HotelHomeComponents/HotelSuggestions/HotelSuggestions.js";
import useDebounce from "../../../../hooks/debounce.js";


const HotelHomeStart = () => {

    const dispatch = useDispatch();
    const { setHotelData } = bindActionCreators(hotelActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setRideData } = bindActionCreators(rideActions, dispatch);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const navigate = useNavigate();
    const [route, setRoute] = useState("allow");
    const [typingInputs, setTypingInputs] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const user = useSelector(state => state.user);
    const locations = useDebounce(typingInputs, fetchPlacesSuggestions, user.RAPID_API_KEY, setRoute, setErrorData);

    const handleChange = (e) => {
        setRoute("loading");
        setTypingInputs(e.target.value);
    }

    const handleSelectedLoc = async (val) => {
        try {
            setRoute("loading");
            const response = await fetchHotelSuggestions(val.id, val.neighbourhood, user.RAPID_API_KEY);
            if(!response) {
                setErrorData("No Hotel Match Found At This Location");
                return setRoute("allow");
            }
            setSuggestions(response);
            setRoute("suggestions");
        } catch (err) {
            setRoute("allow");
        }
    }


    const handleSelectedHotel = async (val) => {
        try {
            setRoute("loading");
            const getData = await fetchHotelDetails(val.id, user.RAPID_API_KEY);
            //redux
            setHotelData(
                {
                    name: getData.name,
                    cordinates: getData.coordinates,
                    address: getData.address,
                    cost: getData.cost
                }
            );
            setRideData({
                destination: {
                    primaryAddress: getData.primaryAddress,
                    secondaryAddress: getData.secondaryAddress||getData.neighbourhood,
                    coordinates: getData.coordinates,
                    address: getData.fullAddress
                }
            })
            setSelectedHotel(getData);
            setRoute("hotel_selected");
        } catch (err) {
            console.log(err);
            setRoute("allow");
        }
    }
    // useEffect(() => {
    //     const rr = {id: 32221765}
    //     setSelectedHotel(fetchDummy());
    //     setRoute("hotel_selected")
    // }, [suggestions]);
   
    return (
        <MapModal>
            <div className="HotelHomeStart_div">
                <div className="HotelHomeStart">
                    <h1>Locate Desired Hotel</h1>
                    {(route!=="hotel_selected"&&route!=="suggestions") && <div className="inputs">
                        <input placeholder="Enter your desired hotel location" 
                        name="destination" onChange={handleChange}
                        />
                    </div>}
                    <div className={`HotelHomeStart__Scroller ${route==="suggestions"||route==="hotel_selected"}`}>
                        {route==="hotel_selected" && 
                            <div className="hC__cancel">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" 
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                                strokeLinejoin="round" className="x" style={{color: "black"}} 
                                onClick={() => setRoute("allow")}>
                                    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                        </div>}
                        {route==="loading" &&
                            <div className="HotelHomeStart__loader">
                                <LoadingSpinner width={"100px"} height={"100px"} />
                            </div>
                        }
                        {route==="locations_suggestions" &&
                            <Suggestions suggestions={locations}
                            handleSelectedLoc={handleSelectedLoc} />
                        }
                        {route==="suggestions" &&
                            <HotelSuggestions suggestions={suggestions} 
                            handleSelectedHotel={handleSelectedHotel} />
                        }
                        {route==="hotel_selected" && <HotelComponent data={selectedHotel} />}
                        {route==="allow" && <Allow />}
                    </div>
                </div>
            </div>
        </MapModal>
    )
}

export default HotelHomeStart;