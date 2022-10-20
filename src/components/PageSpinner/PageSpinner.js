import React from "react";
import "./PageSpinner.css";

const PageSpinner = () => {

    return (
        <div className="pageSpinner">
            <div className="pageSpinner__Div">
                <div className="pageSpinner__Spin"></div>
                <span>Loading</span>
            </div>
        </div>
    )
}

export default PageSpinner;