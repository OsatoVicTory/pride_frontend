import React, { useEffect } from "react";
import MapModal from "../mapModal/mapModal.js";
import "./meetDriver.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Driver from "../driver/Driver";
import Message from "../message/message.js";
import { decodeURL } from "../../utils/encodeURL";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { 
    driverActions, errorActions, 
    walletActions, messageActions, 
    rideActions 
} from "../../state/index";
import { removeTrip } from "../../Services/TripsServices/TripsServices.js";


const MeetDriver = ()=> {

    const ride = useSelector(state => state.ride);
    const wallet = useSelector(state => state.wallet);
    const driver = useSelector(state => state.driver);
    const navigate = useNavigate();
    const loc = useLocation().search;
    const dispatch = useDispatch();
    const { setRideData, removeRideData } = bindActionCreators(rideActions, dispatch);
    const { setDriverData, removeDriverData } = bindActionCreators(driverActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setWalletData } = bindActionCreators(walletActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);

    useEffect(() => {
        if(loc&&loc!==""&&!driver.driverName) {
            const data = decodeURL(loc);
            setDriverData(data.driver);
            setWalletData({ cardAmount: data.wallet });
            setRideData(data.ride);
        }
    }, []);

    const handleRideCancel = () => {
        const sendData = {
            id: driver._id,
            cost: wallet.paid ? (wallet.cardAmount-0)+(ride.cost-0) : null
        }
        removeTrip(sendData).then(res => {
            if(res.data.status === "failed") {
                setErrorData(res.data.message);
                return;
            }
            removeDriverData({});
            removeRideData({});
            if(res.data.wallet) setWalletData({...res.data.wallet, paid: false});
            setMessageData(res.data.message||"Trip Cancelled");
            navigate(`/app/rides`);
        }).catch(err => {
            setErrorData(err.response?.data.message||err?.message);
            return;
        })
    }

    const handlePopup = (text) => {
        setTimeout(() => {
            setMessageData(text);
        }, 1000);
    }

    return (
        <MapModal>
            <div className="meetDriver">
                <div className="mD_layer1">
                    <span className="thick_med">Meet at the pickup point</span>
                    <div className="meetDriverTimer">
                        <span>{Math.max(5, Math.floor(Math.random() * 30))}</span>
                        <span style={{marginTop: "2px"}}>min</span>
                    </div>
                </div>
                <div className="mD_layer2">
                    <Driver />
                </div>
                <div className="mD_layer3">
                    <Message handlePopup={() => handlePopup("Message Sent Successfully")} />
                </div>
                <div className="scroller">
                    <div className="mD_layer4">
                        <div className="mD4_content">
                            <div className="mD4" onClick={() => handlePopup("All Trips are Safe. I think")}>
                                <Link to="#" className="mD4_svg" style={{textDecoration: "none"}}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" color="#276EF1">
                                        <title>Shield</title>
                                        <path d="M12 1C6.68 1 2 3.04 2 3.04v11.9c0 4.84 5.57 7.15 10 9.06 4.4-1.89 10-4.2 10-9.06V3.04S17.5 1 12 1zm7 13.94c0 2.39-3.09 4.07-7 5.79-4.03-1.77-7-3.39-7-5.79V5.15C6.65 4.64 9.26 4 12 4c2.83 0 5.39.63 7 1.14v9.8z" 
                                        fill="currentColor">
                                        </path>,
                                        <path d="M7 6.67v8.28c0 1.15 2.7 2.56 5 3.6 2.3-1.04 5-2.45 5-3.6v-8.3C15.63 6.3 13.88 6 12 6c-1.83 0-3.59.31-5 .67z" 
                                        fill="currentColor"></path>
                                    </svg>
                                </Link>
                                <span>Safety</span>
                            </div>
                            <div className="mD4" onClick={() => handlePopup("Its Just a Feature man")}>
                                <Link to="#" className="mD4_svg"  style={{textDecoration: "none"}} >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" color="#276EF1">
                                        <title>Location share</title>
                                        <g fill="currentColor">
                                            <path d="M5.59 5.6l-2-2c-4.69 4.6-4.69 12.2 0 16.9l2-2c-3.5-3.6-3.5-9.4 0-12.9zM20.41 3.6l-2 2c3.5 3.5 3.5 9.3 0 12.9l2 2c4.69-4.7 4.69-12.3 0-16.9z">
                                            </path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.05 16.95L12 21.9l4.95-4.95a7.007 7.007 0 000-9.9 7.007 7.007 0 00-9.9 0 7.007 7.007 0 000 9.9zM14 12a2 2 0 11-4 0 2 2 0 014 0z">
                                            </path>
                                        </g>
                                    </svg>
                                </Link>
                                <span>Share my trip</span>
                            </div>
                            <div className="mD4" onClick={() => handlePopup(`A Dummy Number Dont Call. ${driver.phoneNumber}`)}>
                                <Link to="#" className="mD4_svg" style={{textDecoration: "none"}}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" color="#276EF1">
                                        <title>Phone</title>
                                        <path d="M15.9 13.4l-3.6 4.1c-2.4-1.4-4.4-3.4-5.8-5.8l4.1-3.6L9.2 1H1v1.5C1 13.8 10.2 23 21.5 23H23v-8.2l-7.1-1.4z" 
                                        fill="currentColor">
                                        </path>
                                    </svg>
                                </Link>
                                <span>Call driver</span>
                            </div>
                        </div>
                    </div>
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
                                    {ride.pickup.secondaryAddress || ""}
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
                onClick={handleRideCancel}>
                    Cancel
                </div>
            </div>
        </MapModal>
    )
}

export default MeetDriver;