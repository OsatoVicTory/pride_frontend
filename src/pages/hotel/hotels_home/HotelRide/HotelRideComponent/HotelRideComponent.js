import React from "react";
import "./HotelRideComponent.css";
import image from "../../../../../imgs/Black.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { encodeURL } from "../../../../../utils/encodeURL";
import Button from "../../../../../components/Button/Button";

const HotelRideComponent = () => {

    const ride = useSelector(state => state.ride);
    const navigate = useNavigate();
    
    const handleRequestRide = () => {
        const encode = encodeURL(ride);
        navigate(`/app/hotel/finddriver/?${encode}`);
    }

    return (
        <div className="hotelSelected">
            {/* <h1></h1> */}
            <div className="hSS__Content__Div">
                <div className="hSS__Pride">
                    <img src={image} />
                    <div className="hSS__Pride__Texts">
                        <div className="hSS__Pride__Top">
                            <span className="hSS__Pride__Thick_med" style={{marginLeft: "0px"}}>U...</span>
                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                                <title>Person multiple</title>
                                <g fill="currentColor">
                                    <path 
                                    d="M12 5.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM23 5.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM1 17v6h9V12H6c-2.8 0-5 2.2-5 5zM12 23v-6c0-2.8 2.2-5 5-5h6v11H12z">
                                    </path>
                                </g>
                            </svg>
                            <span className="hSS__Pride__Med">1</span>
                            <span className="hSS__Pride__Thick_med">
                                NGN {ride.cost}.00
                            </span>
                        </div>
                        <span className="hSS__Pride__Small" style={{marginTop: "5px"}}>
                            Affordable, everyday rides
                        </span>
                        <span className="hSS__Pride__Small" style={{marginTop: "5px"}}>
                            In {ride.time} {ride.dropoff} dropoff
                        </span>
                    </div>
                </div>
            </div>
            <div className="hSS__Bottom">
                <Link to="payments" className="fB_top" style={{textDecoration: "none"}}>
                    <div className="cash">
                        {/* <svg></svg> */}
                        <span className="thick_small">Cash</span>
                    </div>
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                        <title>Chevron down small</title>
                        <path d="M18 8v3.8l-6 4.6-6-4.6V8l6 4.6L18 8z" fill="currentColor"></path>
                    </svg>
                </Link>
                <Button label={"Request Ride"} handleClick={handleRequestRide} />
            </div>
        </div>
    )
}

export default HotelRideComponent;