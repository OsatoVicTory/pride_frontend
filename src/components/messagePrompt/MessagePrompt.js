import React from "react";
import "./MessagePrompt.css";
import SVGs from "../../imgs/SVGs";

const MessagePrompt = ({ type, text }) => {

    return (
        <div className={`messagePrompt ${type===null?false:true}`}
        style={{borderLeft: `5px solid ${type==="error"?"red":"green"}`}}>
            <div className="mP__Div">
                <div className="mP__Img"
                style={{backgroundColor: type==="error" ? "red" : "green"}}>
                    {type==="error" ? SVGs.xMark : SVGs.check}
                </div>
                <span>
                    {text}
                </span>
            </div>
        </div>
    )
}

export default MessagePrompt;