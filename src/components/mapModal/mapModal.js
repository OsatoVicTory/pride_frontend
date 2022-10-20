import React from "react";
import "./mapModal.css";

const MapModal = ({ children }) => {

    return (
        <div className="mapModal">
            {children}
        </div>
    )
}

export default MapModal;