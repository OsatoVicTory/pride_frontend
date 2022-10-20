import React from "react";
import "./Hotel.css";
import { Routes, Route } from "react-router-dom";
import FindDriver from "../../components/findDriver/findDriver.js";
import MeetDriver from "../../components/meetDriver/meetDriver.js";
import Schedule from "../../components/schedule/Schedule";
import HotelHomeStart from "./hotels_home/HotelHome/HotelHome";
import HotelRide from "./hotels_home/HotelRide/hotelRide";

const Hotel = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<HotelHomeStart />} />
                <Route path="/ride/*" element={<HotelRide />} />
                <Route path="/finddriver" element={<FindDriver />} />
                <Route path="/meetdriver" element={<MeetDriver />} />
                <Route path="/schedule" element={<Schedule />} />
            </Routes>
        </>
    )
}

export default Hotel;