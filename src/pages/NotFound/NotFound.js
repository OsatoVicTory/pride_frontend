import React from "react";
import "./NotFound.css";
import SVG from "../../imgs/warning.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="notFound">
            <div className="nF__Content">
                <img src={SVG} />
                <span>Do You Want to take a Ride</span>
                <div className="nF__Button"
                onClick={() => navigate("/app/rides")}>Go There</div>
            </div>
        </div>
    )
}

export default NotFound;