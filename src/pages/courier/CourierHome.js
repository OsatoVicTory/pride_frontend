import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import pic from "../../imgs/courierVan.jpg";
import { messageActions, errorActions } from "../../state";
import Button from "../../components/Button/Button";
import MapModal from "../../components/mapModal/mapModal";
import "./Courier.css";

const CourierHome = () => {

    const [courierInputs, setCourierInputs] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setMessageData } = bindActionCreators(messageActions, dispatch);
    const { setErrorData } = bindActionCreators(errorActions, dispatch);

    const handleCourierChange = (e) => {
        setCourierInputs({
            ...courierInputs,
            [e.target.name]: e.target.value
        })
    }

    const handleCourierClick = () => {
        const inputsNotOk = ["name","size","quantity","extra_info"].find(key => !courierInputs[key]);
        if(inputsNotOk) return setErrorData("Provide Values For Missing Fields");
        setTimeout(() => {
            setMessageData("Courier Data Stored");
        }, 1500);
        
        setTimeout(() => {
            navigate("/app/courier/ride");
        }, 2000);
    }

    return (
        <MapModal>
            <div className="courier">
                <div className="courier__Div">
                    <div className="courier__Div__Top">
                        <h1>PRIDE COURIER SERVICES</h1>
                        <div className="courier__Img">
                            <img src={pic} />
                        </div>
                        <div className="courier__Inputs">
                            <input placeholder="Enter Name of Package" name="name" 
                            type="text" onChange={handleCourierChange} />
                            <input placeholder="Enter Size of package" name="size" 
                            type="number" onChange={handleCourierChange} />
                            <input placeholder="Enter Package Quantity" name="quantity" 
                            type="number" onChange={handleCourierChange} />
                            <input placeholder="Enter Extra details of Package"
                            name="extra_info" type="text" onChange={handleCourierChange} />
                        </div>
                    </div>
                    <div className="courier__Bottom">
                        <Button label={"Start Request"} handleClick={handleCourierClick} />
                    </div>
                </div>
            </div>
        </MapModal>
    )
}

export default CourierHome;