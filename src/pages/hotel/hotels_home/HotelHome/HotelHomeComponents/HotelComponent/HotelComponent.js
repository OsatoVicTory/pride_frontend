import React, { useState, useEffect } from "react";
// import Button from "../../../../components/Button/Button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import hotelRoutesPages from "./HotelRoutesPages";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { rideActions, errorActions } from "../../../../../../state/index";
import "./HotelComponent.css";
import Button from "../../../../../../components/Button/Button";
import { encodeURL } from "../../../../../../utils/encodeURL";

const HotelComponent = ({ data }) => {

    const [hotelRoute, setHotelRoute] = useState("about");
    const hotelRoutes = ["about", "features", "policies"];
    const navigate = useNavigate();
    const ride = useSelector(state => state.ride);
    const dispatch = useDispatch();
    const { setRideData } = bindActionCreators(rideActions, dispatch);
    const [fixed, setFixed] = useState(null);

    const handleBookRide = () => {
        const encode = encodeURL(ride);
        navigate(`/app/hotel/ride/?${encode}`);
    };


    return (
        <div className="hotelComponent">
            <div className="hC__Content">
                {/* <div className="hC__Routes"> */}
                    <ul className={`hC__Routes__ul`}>
                        {hotelRoutes.map((val, idx) => (
                            <li key={`hC-${idx}`} 
                            className={`hC__Routes__li ${hotelRoute===val}`}
                            onClick={() => setHotelRoute(val)}>
                                {val}
                            </li>
                        ))}
                    </ul>
                {/* </div> */}
                <div className="hC__Img"><img src={data.img} /></div>
                <h1>{data.name}</h1>
                {hotelRoutesPages[hotelRoute](data)}
            </div>
            <div className="hC__Content__Base">
                <Button label={"Book Ride"} handleClick={handleBookRide} />
            </div>
        </div>
    )
}

export default HotelComponent;