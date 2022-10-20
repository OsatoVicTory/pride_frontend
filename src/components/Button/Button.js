import React from "react";
import "./Button.css";
import LoadingSpinner from "../loading/loading";

const Button = ({ label, handleClick, loading }) => {

    return (
        <div className="button" onClick={handleClick}>
            {!loading && <span>{label}</span>}
            {loading && <LoadingSpinner width={"13px"} height={"13px"} />}
        </div>
    )
}

export default Button;