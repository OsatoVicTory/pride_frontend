import React from "react";
import { Routes, Route } from "react-router-dom";
import CourierHome from "./CourierHome";
import "./Courier.css";
import { useSelector } from "react-redux";
import FindDriver from "../../components/findDriver/findDriver.js";
import MeetDriver from "../../components/meetDriver/meetDriver.js";
import Schedule from "../../components/schedule/Schedule";
import SelectLocation from "../../components/selectLocation/selectLocation";

const Courier = () => {

    const rideData = useSelector(state => state.rides);

    return (
        <>
            <Routes>
                <Route path="/" element={<CourierHome />} />
                <Route path="/ride/*" element={<SelectLocation />} />
                <Route path="/finddriver" element={<FindDriver />} />
                <Route path="/meetdriver" element={<MeetDriver />} />
                <Route path="/schedule" element={<Schedule />} />
            </Routes>
        </>
    )
}

export default Courier;