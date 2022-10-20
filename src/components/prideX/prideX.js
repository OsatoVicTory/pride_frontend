import React from "react";
import "./prideX.css";
import car from "../../imgs/Black.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { encodeURL } from "../../utils/encodeURL";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { messageActions } from "../../state";
import Button from "../Button/Button";

const PrideX = () => {

    const Options = [1];
    const loc = useLocation().pathname;
    const navigate = useNavigate();
    const  rideData = useSelector(state => state.ride);
    const dispatch = useDispatch();
    const { setMessageData } = bindActionCreators(messageActions, dispatch);

    const handleRequestRide = () => {
        setMessageData("You Initialized a Booking. Connecting You With Driver");
        const encode = encodeURL(rideData);
        navigate(`${loc.includes("courier")?"/app/courier/":"/app/rides/"}finddriver/?${encode}`);
    }

    return (
        <div className="prides">
            <ul className="rides_options">
                {Options.map((val, idx) => (
                    <li className="box" key={idx}>
                        <div className="box_img">
                            <img src={car} />
                        </div>
                        <div className="box_texts">
                            <div className="bx_txt_top">
                                <span className="thick_med" style={{marginLeft: "0px"}}>U...</span>
                                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                                    <title>Person multiple</title>
                                    <g fill="currentColor">
                                        <path 
                                        d="M12 5.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM23 5.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM1 17v6h9V12H6c-2.8 0-5 2.2-5 5zM12 23v-6c0-2.8 2.2-5 5-5h6v11H12z">
                                        </path>
                                    </g>
                                </svg>
                                <span className="light_med">4</span>
                                <span className="thick_med"
                                style={{fontSize: "14px"}}>
                                    NGN {rideData.cost}
                                </span>
                            </div>
                            <span className="thick_small" style={{marginTop: "5px"}}>
                                Affordable, everyday rides
                            </span>
                            <span className="light_small" style={{marginTop: "5px"}}>
                                In {rideData.time} {rideData.dropoff} dropoff
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="fixed_bottom">
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
                <div className="fB_button">
                    <Button label="Request uber" handleClick={handleRequestRide} />
                </div>
            </div>
        </div>
    )
}

export default PrideX;