import React, { useState, useEffect } from "react";
import Button from "../../Button/Button";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import "./PaymentsModal.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { encodeURL } from "../../../utils/encodeURL";
import { rideActions, errorActions, messageActions, walletActions } from "../../../state";
import { bookTrip } from "../../../Services/TripsServices/TripsServices";
import { getWallet } from "../../../Services/WalletServices/WalletServices";
import LoadingSpinner from "../../loading/loading";
import cashImg from "../../../imgs/cashImg.png";


const PaymentsModal = () => {

    const navigate = useNavigate();
    const { search } = useLocation();
    const [loading, setLoading] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const wallet = useSelector(state => state.wallet);
    const ride = useSelector(state => state.ride);
    const driver = useSelector(state => state.driver);
    const dispatch = useDispatch();
    const { setRideData } = bindActionCreators(rideActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const { setWalletData } = bindActionCreators(walletActions, dispatch);

    // const path = window.location.pathname;
    const loc = window.location.pathname;
    const path = `app/${loc.includes("courier")?"courier/ride":loc.includes("hotel")?"hotel/ride":"rides"}`;
    const pathName = loc.includes("courier") ? "courier" : loc.includes("hotel") ? "hotel" : "ride";

    const closeModal = () => {
        navigate(-1);
    }

    const handleCash = () => {
        setLoading(true);
        const data = {
            ...wallet, 
            cardAmount: wallet.cardAmount,
            paid: false, 
            pickup: ride.pickup.fullAddress,
            destination: ride.destination.fullAddress,
            amountPaid: ride.cost,
            distance: ride.distance,
            rideType: pathName
        };

        setTimeout(() => {
            setLoading(false);
            setWalletData(data);
            setMessageData("You Initialized a Booking. Connecting You With Driver");

            
            const encode = encodeURL(ride);
            if(loc.includes("hotel")) navigate(`/app/hotel/finddriver/?${encode}`);
            else if(loc.includes("courier")) navigate(`/app/courier/finddriver/?${encode}`);
            else navigate(`/app/rides/finddriver/?${encode}`);
        }, 2000);
    }

    useEffect(() => {
        getWallet().then(res => {
            setPageLoaded(true);
            if(res.data.status === "failed") return setErrorData(res.data.message);

            if(res.data.message) setMessageData(res.data.message);
            setWalletData(res.data.wallet);
        }).catch(err => {
            setPageLoaded(true);
            setErrorData(err.response?.data.message||err.message);
        })
    }, []);



    return (
        <ModalWrapper closeModal={closeModal}>
            {!pageLoaded && <div className="paymentsModal__Loader">
                <LoadingSpinner width={"80px"} height={"80px"} />
            </div>}
            {pageLoaded && <div className="paymentsModal">
                <div className="paymentsModal__Top">
                    <h1>Payments Options</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                    strokeLinejoin="round" className="x" style={{color: "black"}} 
                    onClick={closeModal}>
                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <div className="paymentsModal__Mid">
                    <div className="pMM">
                        <div className="pMM__Left">
                            <img src={cashImg} />
                            <span>Cash</span>
                        </div>
                        <div className="pMM__Svg">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                <title>Checkmark small</title>
                                <path d="M10.5 17.6l-6.1-6 2.2-2.2 3.9 4 7.4-7.5 2.2 2.2-9.6 9.5z" 
                                fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>
                    {wallet.cardNumber && <div className="pMM">
                        <div className="pMM__Left"
                        onClick={() => navigate(`/${path}/pay`)}>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                <title>Checkmark small</title>
                                <path d="M10.5 17.6l-6.1-6 2.2-2.2 3.9 4 7.4-7.5 2.2 2.2-9.6 9.5z" 
                                fill="currentColor"></path>
                            </svg>
                            <span>Pay With Your Card</span>
                        </div>
                    </div>}
                    <div className="pMM">
                        <div className="pMM__Left"
                        onClick={() => navigate(`/${path}/payments-setup`)}>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                <title>Plus small</title>
                                <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z" 
                                fill="currentColor"></path>
                            </svg>
                            <span>Add Card</span>
                        </div>
                    </div>
                </div>
                <div className="paymentsModal__Bottom">
                    <Button label={"Pay With Cash"} handleClick={handleCash} loading={loading} />
                </div>
            </div>}
        </ModalWrapper>
    )
}

export default PaymentsModal;