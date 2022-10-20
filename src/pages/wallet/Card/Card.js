import React from "react";
import "./Card.css";
import CardQuery from "../../../utils/Card";
import chip from "../../../imgs/chip.jpeg";

const Card = ({ state, showBack }) => {

    return (
        <div className="card"
        style={{transform: `rotateY(${showBack ? "180deg" : "0deg"})`}}>
            {!showBack && <div className="f__Card">
                <div className="cardTop">{state.cardType?"CREDIT CARD":"CASH"}</div>
                <div className="card__Chip">
                    <img src={chip} />
                </div>
                <div className="card_number">
                    <span className="c_Number">
                        {CardQuery.formatNumber(state.cardNumber) || ""}</span>
                </div>
                <div className="cardBase">
                    <div className="card_name">
                        <span>{CardQuery.formatName(state.cardName) || ""}</span>
                    </div>
                    <div className="card_expiry">
                        <span className="card_expiry_label">Valid thru</span>
                        <span className="c_Expiry">
                            {CardQuery.formatExpiry(state.cardExpiry) || ""}
                        </span>
                    </div>
                </div>
            </div>}
            {showBack && <div className="b__Card">
                <div className="cardTop_div">
                    <div className="cardTop"></div>
                    <div className="card_cvc">
                        <span className="c_Cvc">{state.cardCvc || ""}</span>
                    </div>
                </div>
                <div className="cardBase">
                    <span className="justAdd">
                        This card is under due Protection and authorization
                    </span>
                    <span className="justAdd">
                        Call the CEO, Osato : +2349065352839
                    </span>
                </div>
            </div>}
        </div>
    )
}

export default Card;