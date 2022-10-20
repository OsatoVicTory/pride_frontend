import React, { useRef, useState } from "react";
import "./WalletCardForm.css";
import Button from "../../../components/Button/Button";
import { setUpWallet } from "../../../Services/WalletServices/WalletServices";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { walletActions, errorActions, messageActions } from "../../../state/index";


const WalletCardForm = ({ state, setState, setShowBack }) => {

    const wallet = useSelector(state => state.wallet);
    const dispatch = useDispatch();
    const { setWalletData } = bindActionCreators(walletActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const [loading, setLoading] = useState(false);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const refs = [ref1,ref2,ref3,ref4];
    const arr = ["cardNumber","cardName","cardExpiry","cardCvc"];

    const handleChange = (e) => {
        if(e.target.name === "cardAmount") return setState({...state, cardAmount: e.target.value})
        const idx = arr.indexOf(e.target.name);
        if(e.target.name==="cardNumber") {
            if(e.target.value.length > 16) return refs[idx].current.value = state[e.target.name];
            if(e.target.value.length === 16) refs[(idx+1) % 4].current.focus();
            setState({
                ...state,
                [e.target.name]: e.target.value
            });
        }
        else if(e.target.name==="cardExpiry") {
            if(e.target.value.length > 4) return refs[idx].current.value = state[e.target.name];
            if(e.target.value.length === 4) refs[(idx+1) % 4].current.focus();
            setState({
                ...state,
                [e.target.name]: e.target.value
            });
        }
        else if(e.target.name==="cardCvc") {
            if(e.target.value.length > 3) return refs[idx].current.value = state[e.target.name];
            if(e.target.value.length === 3) refs[(idx+1) % 4].current.focus();
            setState({
                ...state,
                [e.target.name]: e.target.value
            });
        }
        else {
            if(e.target.value.split(" ")[3]) return refs[idx].current.value = state[e.target.name];
            if(e.target.value.split(" ")[2]) refs[(idx+1) % 4].current.focus();
            setState({
                ...state,
                [e.target.name]: e.target.value
            });
        }
    }

    const inputsNotFilled = () => {
        return ["cardName","cardNumber","cardExpiry","cardCvc"].find(key => !state[key]);
    }

    const handleCardSubmit = () => {
        setLoading(true);
        if(inputsNotFilled()) {
            setLoading(false);
            setErrorData("Provide Values For Empty Required Field(s)");
        } else {
            setUpWallet(state).then(res => {
                setLoading(false);
                if(res.data.status === "failed") return setErrorData(res.data.message);
    
                if(res.data.message) setMessageData(res.data.message);
                setWalletData(res.data.wallet);
            }).catch(err => {
                setLoading(false);
                setErrorData(err.response?.data.message||err.message);
            })
        }
    }

    return (
        <div className="WCF">
            <form>
                <h1>Card Setup</h1>
                <div className="WCF__Input">
                    <span>Card Amount</span>
                    <input placeholder="Enter An Amount to Start Off With" type="number"
                    name="cardAmount" onChange={handleChange} />
                </div>
                <div className="WCF__Input">
                    <span>Card Number</span>
                    <input placeholder="Enter Card Number" type="number" ref={ref1}
                    name="cardNumber" onChange={handleChange} />
                </div>
                <div className="WCF__Input">
                    <span>Card Name</span>
                    <input placeholder="Enter Card Name" name="cardName"
                    ref={ref2} onChange={handleChange} />
                </div>
                <div className="WCF__Input">
                    <span>Card Expiry Date</span>
                    <input placeholder="Enter Card Expiry Date" type="number" ref={ref3} 
                    name="cardExpiry" onChange={handleChange} />
                </div>
                <div className="WCF__Input">
                    <span>Card CVC</span>
                    <input placeholder="Enter Card CVC" type="number" ref={ref4}
                    name="cardCvc" onChange={handleChange} 
                    onFocus={() => setShowBack(true)}  
                    onBlur={() => setShowBack(false)} />
                </div>
                <div className="WCF__Bottom">
                    <Button label={"Save"} handleClick={handleCardSubmit} 
                    loading={loading} />
                </div>
            </form>
        </div>
    )
}

export default WalletCardForm;