import React, { useEffect } from "react";
import "./rides.css";
import { Routes, Route } from "react-router-dom";
import "./Configs.css";
import SelectLocation from "../../components/selectLocation/selectLocation.js";
import FindDriver from "../../components/findDriver/findDriver.js";
import MeetDriver from "../../components/meetDriver/meetDriver.js";
import Schedule from "../../components/schedule/Schedule";
import PageLayout from "../../layout/PageLayout/PageLayout";
import PaymentsModal from "../../components/Modals/PaymentModal/PaymentsModal";
import CardForm from "../../components/Modals/CardForm/CardForm";
import { useSelector } from "react-redux";

const Rides = () => {

    const rideData = useSelector(state => state.ride);

    return (
        <>
            <Routes>
                <Route path="/*" element={<SelectLocation />} />
                <Route path="/finddriver" element={<FindDriver />} />
                <Route path="/meetdriver" element={<MeetDriver />} />
                <Route path="/schedule" element={<Schedule />} />
            </Routes>
        </>
    )
}

export default Rides;