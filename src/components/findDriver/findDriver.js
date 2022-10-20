import React, { useEffect, useState } from "react";
import MapModal from "../mapModal/mapModal.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import car from "../../imgs/Black.png";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { decodeURL, encodeURL } from "../../utils/encodeURL.js";
import { driverActions, errorActions, walletActions, messageActions } from "../../state/index";
import { findDriverAndBookTrip } from "../../Services/DriverServices/Driver";
import "../meetDriver/meetDriver.css";
import "./findDriver.css";
import LoadingSpinner from "../loading/loading.js";

const FindDriver = () => {

    const dispatch = useDispatch();
    const loc = useLocation().search;
    const wallet = useSelector(state => state.wallet);
    const ride = useSelector(state => state.ride);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setDriverData } = bindActionCreators(driverActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setWalletData } = bindActionCreators(walletActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);

    useEffect(() => {
        let rideData = {
            pickup: ride.pickup.address,
            destination: ride.destination.address,
            amountPaid: ride.cost,
            cardAmount: wallet.paid ? wallet.cardAmount : null,
            rideType: ride.rideType
        }
        const path = window.location.pathname.split("/");
        const prevPath = path.slice(1, path.length-2).join("/");
        const getPrevShortPath = () => {
            if(path.includes("courier")) {
                return `/app/courier`;
            } else if(path.includes("hotel")) {
                return `/app/hotel`;
            } else {
                return `/app/rides`;
            }
        }
        const getPrevPath = () => {
            const encoded = encodeURL(ride);
            if(path.includes("hotel")) {
                return `/app/hotel/ride/?${encoded}`;
            } else if(path.includes("courier")) {
                return `/app/courier/ride/?${encoded}`;
            } else {
                return `/app/rides/?${encoded}`;
            }
        }
        findDriverAndBookTrip(rideData).then(res => {
            setLoading(false);
            if(res.data.status === 'failed') {
                setErrorData(res.data.message);
                return navigate(getPrevPath());
            }

            const data = decodeURL(loc.slice(1, loc.length));
            const newData = {
                ride: {...data},
                driver: {
                    driverName: res.data.driver._id,
                    _id: res.data.driver._id,
                    code: res.data.driver.code,
                    phoneNumber: res.data.driver.phoneNumber
                },
                wallet: res.data?.wallet?.cardAmount
            }
            const encode = encodeURL(newData);
            setDriverData(res.data.driver);
            if(res.data.wallet) setWalletData(res.data.wallet);
            setMessageData("Ride Booked Successfully With Driver");
            const newPath = getPrevShortPath();
            navigate(`${newPath}/meetdriver/?${encode}`);
        }).catch(err => {
            setLoading(false);
            setErrorData(err.response?.data.message||err?.message);
            navigate(getPrevPath());
        })
    }, []);

    return (
        <MapModal>
            <div className="meetDriver">
                <div className="mD1">
                    <h1>Looking for nearby drivers</h1>
                </div>
                <div className="mD_img">
                    <img src={car} />
                </div>
                {loading && <div className="mDD__Loading">
                    <LoadingSpinner width={"50px"} height={"50px"} />
                </div>}
                <div className="scroller mDD">
                    <div className="mD_layer5">
                        <div className="pickup">
                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" color="#000000">
                                <title>Location marker</title>
                                <path d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4zM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" 
                                fill="currentColor"></path>
                            </svg>
                            <div className="column-flex2">
                                <span className="thick_med">{ride.pickup.primaryAddress}</span>
                                <span className="light_med" style={{marginTop: "2px"}}>
                                    {ride.pickup.secondaryAddress}
                                </span>
                            </div>
                        </div>
                        <div className="pickup">
                            <div className="block"></div>
                            <div className="column-flex2">
                                <span className="thick_med">{ride.destination.primaryAddress}</span>
                                <span className="light_med" style={{marginTop: "2px"}}>
                                    {ride.destination.secondaryAddress}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cancel" style={{textDecoration: "none"}}
                onClick={() => navigate(-1)}>
                    Cancel
                </div>
            </div>
        </MapModal>
    )
}

export default FindDriver;