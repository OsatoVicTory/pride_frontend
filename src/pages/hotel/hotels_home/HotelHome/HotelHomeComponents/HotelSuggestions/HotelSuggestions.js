import React, { useState } from "react";
import "./HotelSuggestions.css";

const HotelSuggestions = ({ suggestions, handleSelectedHotel }) => {

    return (
        <div className="hotelSuggestions">
            <div className="hS__Content">
                <ul className="hS__Ul">
                    {suggestions.map((val, idx) => (
                        <li key={`hS-${idx}`} className="hS__Li"
                        onClick={() => handleSelectedHotel(val)}>
                            <div className="hS__Img">
                                {val.image && <img src={val.image} />}
                            </div>
                            <div className="hS__Main">
                                <span className="hS__Big">{val.hotelName}</span>
                                <div className="hS__Main__Top">
                                    <span className="hS__Small">{val.neighbourhood}</span>
                                    <span className="hS__Small">
                                        {val.distanceFromSearch} from search
                                    </span>
                                </div>
                                    <div className="hS__rooms">
                                        There are {val.availableRooms} rooms left
                                    </div>
                                    <div>
                                        {val.offers.map((offer, indx) => (
                                            <span className="hS__Small" style={{color:"green"}} 
                                            key={`offer-${indx}`}>
                                                {offer}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="hS__Main__Base">
                                        <span className="hS__Small">{val.reviews}</span>
                                        <span className="hS__Big"
                                        style={{marginTop: "10px"}}>{val.price}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HotelSuggestions;