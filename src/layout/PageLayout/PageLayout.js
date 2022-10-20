import React from "react";
import "./PageLayout.css";
import Header from "../Header/Header";

const PageLayout = ({ children }) => {

    return (
        <div className="PageLayout">
            <Header />
            <div className="PageLayout__Content">
                {children}
            </div>
        </div>
    )
}

export default PageLayout;