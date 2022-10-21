import React, { useState, useEffect } from "react";
import "./activity.css";
import LoadingSpinner from "../../components/loading/loading";
import PageLayout from "../../layout/PageLayout/PageLayout";
import act from "./data";
import { getTrips } from "../../Services/TripsServices/TripsServices";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { rideActions, errorActions, messageActions } from "../../state";

const Activities = () => {

    const [selectedIdx, setSelectedIdx] = useState(0);
    const [activities, setActivities] = useState([]);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true); 
    const wallet = useSelector(state => state.wallet);
    const ride = useSelector(state => state.ride);
    const driver = useSelector(state => state.driver);
    const dispatch = useDispatch();
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);

    useEffect(() => {
        getTrips().then(res => {
            setLoading(false);
            if(res.data.status === "failed") return setErrorData(res.data.message);

            if(res.data.message) setMessageData(res.data.message);
            const { trips } = res.data;
            let filteredTrips = [];
            for(var i=0;i<trips.length;i+=2) filteredTrips.push(trips[i]);
            setTrips(filteredTrips);
            setActivities(filteredTrips);
        }).catch(err => {
            setLoading(false);
            setErrorData(err.response?.data.message||err.message);
        })
    }, []);

    const handleRoute = (val, idx) => {
        setSelectedIdx(idx);
        if(idx===0) return setActivities(trips);
        const newArr = trips.filter(ac => ac.rideType === val);
        setActivities(newArr);

        //if we want to make api call
        // if(idx===0) return setActivities(act);
        // const newArr = trips.filter(ac => ac.type === val);
        // setActivities(newArr);
    }

    const activitiesRoutes = ["all","ride","hotel","courier"];

    return (
        // <PageLayout>
            <div className="Activities">
                <div className="activities__Map"></div>
                <div className="activities__Wrapper">
                    <h1>TRIPS</h1>
                    <div className="activities__Top">
                        <ul>
                            {activitiesRoutes.map((val, idx) => (
                                <li key={`activities-${idx}`}
                                className={`activities__Route ${idx===selectedIdx}`}
                                onClick={() => handleRoute(val, idx)}
                                >{val}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="activities__Content">
                        {loading && <LoadingSpinner width={"200px"} height={"200px"} />}
                        {(!loading&&!trips.length) && <div className="noTrips">
                            <span>You Have Not Made Any Trip Yet</span>
                        </div>}
                        {(!loading&&trips.length) && <ul>
                            {activities.map((val, idx) => (
                                <li key={`Activities-${idx}`}>
                                    <div className="activities__li__left">
                                        <div className="activities__Svg">
                                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" color="white">
                                                <title>Center</title>
                                                <path fillRule="evenodd" clipRule="evenodd" 
                                                d="M20.9 10.5H24v3h-3.1c-.7 3.8-3.6 6.8-7.4 7.4V24h-3v-3.1c-3.8-.7-6.8-3.6-7.4-7.4H0v-3h3.1c.7-3.8 3.6-6.8 7.4-7.4V0h3v3.1c3.8.7 6.8 3.6 7.4 7.4zM6 12c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6-6 2.7-6 6zm9 0a3 3 0 11-6 0 3 3 0 016 0z" 
                                                fill="currentColor"></path>
                                            </svg>
                                        </div>
                                        <div className="activities__Dets">
                                            <span className="activities__Big">Pickup: {val.pickup}</span>
                                            <span className="activities__Big" style={{marginTop: '5px'}}>
                                                Dropoff: {val.destination}
                                            </span>
                                        <span className="activities__Small"
                                        style={{marginTop: '5px'}}>
                                            Driver: {val.driverName}</span>
                                        </div>
                                    </div>
                                    <div className="activities__Paid">
                                        {/* <span className="activities__" */}
                                        <span className="activities__Big" 
                                        style={{color: "rgb(143, 141, 141)"}}>
                                            {val.amountPaid}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>}
                    </div>
                </div>
            </div>
        // </PageLayout>
    )
}

export default Activities;