import React from "react";
import "./Driver.css";
import { useSelector } from "react-redux";
import car from "../../imgs/Black.png";
import driverCar from "../../imgs/driverCar_Img.png";
import bike from "../../imgs/bike.jpg";

const Driver = () => {

    const driver = useSelector(state => state.driver);
    const ride = useSelector(state => state.ride);
    const isCourier = window.location.pathname.includes("courier");

    return (
        <div className="driver">
            <div className="driver_pics">
                <div className="absolute_pic">
                    <img src={driver.img} />
                </div>
                <div className="relative_pic">
                    <img src={isCourier?bike:driverCar} />
                </div>
            </div>
            <div className="column_text">
                <div className="display">
                    <span className="light_med">{driver.name}</span>
                </div>
                <div className="display">
                    <span className="thick_big">{driver.code}</span>
                </div>
                <div className="display">
                    <span className="light_med">
                        {isCourier?"Red Motorbike":"Blue Toyota Corolla"}
                    </span>
                </div>
                <div className="display">
                    <div className="star">
                        <svg width="0.8em" height="0.8em" viewBox="0 0 24 24" fill="none" color="contentSecondary">
                            <title>Star</title>
                            <path d="M12.458 1l3.646 7 7.813.5-5.73 5.5 2.084 8-7.813-4-7.812 4 2.083-8L1 8.5 8.813 8l3.645-7z" fill="currentColor">
                            </path>
                        </svg>
                        <span className="light_med" style={{marginLeft: "5px"}}>
                            {Math.max(3, driver.rating)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Driver;