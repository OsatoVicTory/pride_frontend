import React, { useState } from "react";
import Button from "../../Button/Button";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import "./PayModal.css";
import { useNavigate } from "react-router-dom";
import Card from "../../../pages/wallet/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { encodeURL } from "../../../utils/encodeURL";
import { bookTrip } from "../../../Services/TripsServices/TripsServices";
import { walletActions, errorActions, messageActions } from "../../../state/index";


const PayModal = () => {

    const navigate = useNavigate();
    const [turn, setTurn] = useState(false);
    const wallet = useSelector(state => state.wallet);
    const driver = useSelector(state => state.driver);
    const ride = useSelector(state => state.ride);
    const dispatch = useDispatch();
    const { setWalletData } = bindActionCreators(walletActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        navigate(-1);
    }
    const loc = window.location.pathname;
    const pathName = loc.includes("courier") ? "courier" : loc.includes("hotel") ? "hotel" : "ride";

    const handlePay = () => {
        setLoading(true);
        if(wallet.cardAmount < ride.cost) {
            setLoading(false);
            setErrorData(`Sorry You Don't Have Enough Money For The NGN${ride.cost} Ride.`);
            return;
        }
        //set up only amount paid and new card amount and extract info on ride 
        //for booking Trip
        const data = {
            ...wallet, 
            cardAmount: (wallet.cardAmount - ride.cost), 
            paid: true,
            pickup: ride?.pickup?.fullAddress,
            destination: ride?.destination?.fullAddress,
            distance: ride.distance,
            amountPaid: ride.cost,
            rideType: pathName
        };

        setTimeout(() => {
            setLoading(false);
            setWalletData(data);
            setMessageData("You Initialized a Booking. Connecting You With Driver");
        }, 1000);

        setTimeout(() => {
            const loc = window.location.pathname;
            const encode = encodeURL(ride);
            if(loc.includes("hotel")) return navigate(`/app/hotel/finddriver/?${encode}`);
            else if(loc.includes("courier")) return navigate(`/app/courier/finddriver/?${encode}`);
            else return navigate(`/app/rides/finddriver/?${encode}`);
        }, 3000);
    }

    return (
        <ModalWrapper closeModal={closeModal}>
            <div className="payModal">
                <div className="payModal__Top">
                    <h1>Payments Options</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                    strokeLinejoin="round" className="x" style={{color: "black"}} 
                    onClick={closeModal}>
                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <div className="payModal__Mid">
                    <div className="payModal__Card">
                        <span onClick={() => setTurn(!turn)}>Turn</span>
                        <Card state={wallet} showBack={turn} />
                    </div>
                </div>
                <div className="payModal__Bottom">
                    <Button label={"Pay With Card"} handleClick={handlePay} loading={loading} />
                </div>
            </div>
        </ModalWrapper>
    )
}

export default PayModal;