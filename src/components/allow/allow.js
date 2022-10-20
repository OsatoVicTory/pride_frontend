import React from "react";
import "./allow.css";
import "../../pages/rides/Configs.css";

const Allow = () => {

    return (
        <div className="default_container">
            <div className="allow">
                <div className="svg_container">
                    <div className="allow_svg">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" color="#FFFFFF">
                            <title>Center</title>
                            <path fillRule="evenodd" clipRule="evenodd" 
                            d="M20.9 10.5H24v3h-3.1c-.7 3.8-3.6 6.8-7.4 7.4V24h-3v-3.1c-3.8-.7-6.8-3.6-7.4-7.4H0v-3h3.1c.7-3.8 3.6-6.8 7.4-7.4V0h3v3.1c3.8.7 6.8 3.6 7.4 7.4zM6 12c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6-6 2.7-6 6zm9 0a3 3 0 11-6 0 3 3 0 016 0z" 
                            fill="currentColor"></path>
                        </svg>
                    </div>
                </div>
                <div className="column-flex">
                    <span className="thick_med">Allow location access</span>
                    <span className="light_med">
                        For perfect pickup experience
                    </span>
                </div>
            </div>
            <div className="setLoc">
                <div className="svg_container">
                    <div className="setLoc_svg">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" color="#000000">
                            <title>Report map</title>
                            <path fillRule="evenodd" clipRule="evenodd" 
                            d="M16.2 11.3L12 15.5l-4.2-4.2c-2.3-2.4-2.3-6.2 0-8.5C8.9 1.6 10.5 1 12 1s3 .6 4.2 1.8c2.3 2.4 2.3 6.2 0 8.5zM13.5 7c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zm5.8 4H21l2 11H1l2-11h1.7l7.3 7.3 7.3-7.3z" 
                            fill="currentColor"></path>
                        </svg>
                    </div>
                </div>
                <div className="column-flex">
                    <span className="thick_med">Set location on map</span>
                </div>
            </div>
        </div>
    )
}

export default Allow;