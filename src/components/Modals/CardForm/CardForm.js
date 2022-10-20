import React, { useState } from "react";
import Button from "../../Button/Button";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import "./CardForm.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUpWallet } from "../../../Services/WalletServices/WalletServices";
import { bindActionCreators } from "redux";
import { walletActions, errorActions, messageActions } from "../../../state/index";


const CardForm = () => {

    const navigate = useNavigate();
    const wallet = useSelector(state => state.wallet);
    const dispatch = useDispatch();
    const { setWalletData } = bindActionCreators(walletActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({});
    const closeModal = () => {
        navigate(-1);
    }

    const inputsNotFilled = () => {
        return ["cardName","cardNumber","cardExpiry","cardCvc"].find(key => !inputs[key]);
    }

    const checkInputs = () => {
        if(!inputs["cardName"]) return "Specify Card Name. Please";
        else if((inputs["cardNumber"]+"").length !== 16) return "Card Number Has To Precisely Be 16 Digits Long";
        else if((inputs["cardExpiry"]+"").length !== 4) return "Specify Card Expiry as 4 Digits Like 1122. Which Means Nov 2022";
        else if((inputs["cardCvc"]+"").length !== 3) return "CVC Has To Precisely Be 3 Digits Long";
        else return null;
    }

    const handleCardClicked = () => {
        setLoading(true);
        const inputChecker = checkInputs();
        
        if(inputsNotFilled()) {
            setLoading(false);
            setErrorData("Provide Values For Empty Required Field(s)");
        } else if(inputChecker) {
            setLoading(false);
            setErrorData(inputChecker);
        } else {
            const sendData = {...inputs, cardAmount: inputs.cardAmount||0}
            setUpWallet(sendData).then(res => {
                setLoading(false);
                if(res.data.status === "failed") return setErrorData(res.data.message);
    
                if(res.data.message) setMessageData(res.data.message);
                setWalletData(res.data.wallet);
                const loc = window.location.pathname;
                const payPath = `/app/${loc.includes("courier")?"courier/ride":loc.includes("hotel")?"hotel/ride":"rides"}/pay`;
                navigate(payPath);
            }).catch(err => {
                setLoading(false);
                setErrorData(err.response?.data.message||err.message);
            })
        }
    }

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    return (
        <ModalWrapper closeModal={closeModal}>
            <div className="cardFormModal">
                <div className="cardFormModal__Top">
                    <h1>Create Card Details</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                    strokeLinejoin="round" className="x" style={{color: "black"}} 
                    onClick={closeModal}>
                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <div className="cardFormModal__Mid">
                    <div className="cFM__Input">
                        <span>Card Amount</span>
                        <input placeholder={wallet.cardAmount||"Optional. Enter Amount To Start Off With"} 
                        name="cardAmount" onChange={handleChange} />
                    </div>
                    <div className="cFM__Input">
                        <span>Card Name</span>
                        <input placeholder={wallet.cardName||"Enter Card Name"}
                        name="cardName" onChange={handleChange} />
                    </div>
                    <div className="cFM__Input">
                        <span>Card Number</span>
                        <input placeholder={wallet.cardNumber||"Enter Card Number"} 
                        type="number"
                        name="cardNumber" onChange={handleChange} />
                    </div>
                    <div className="cFM__Input">
                        <span>Card Expiry Date</span>
                        <input placeholder={wallet.cardExpiry||"Enter Card Expiry Date"}
                         type="number" 
                        name="cardExpiry" onChange={handleChange} />
                    </div>
                    <div className="cFM__Input">
                        <span>Card CVC</span>
                        <input placeholder={wallet.cardCvc||"Enter Card CVC"}
                         type="number" 
                        name="cardCvc" onChange={handleChange} />
                    </div>
                </div>
                <div className="cardFormModal__Bottom">
                    <Button label={"Save"} handleClick={handleCardClicked} 
                    loading={loading} />
                </div>
            </div>
        </ModalWrapper>
    )
}

export default CardForm;