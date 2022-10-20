import React from "react";
import "./ErrorPage.css";
import SVG from "../../imgs/warning.svg";

const ErrorPage = ({ text }) => {

    const handleReload = () => window.location.reload();
    return (
        <div className="errorPage">
            <div className="eP__Content">
                <img src={SVG} />
                {!text && <span>
                    Oops Network Error. Fix Internet and click 
                    below to refresh the page
                </span>}
                {text && <span>{text}</span>}
                {!text && <div className="eP__Button"
                onClick={handleReload}>REFRESH</div>}
            </div>
        </div>
    )
}

export default ErrorPage;