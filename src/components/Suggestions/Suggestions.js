import React from "react";
import "./Suggestions.css";

const Suggestions = ({ suggestions, handleSelectedLoc }) => {

    return (
        <div className="suggestions">
            <ul className="suggestions__ul">
                {suggestions.map((val, idx) => (
                    <li key={`suggest-${idx}`} className="suggestions__li"
                    onClick={() => handleSelectedLoc(val)}>
                        <div className="suggestions__Img">
                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" color="#000000">
                                <title>Location marker</title>
                                <path d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4zM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" 
                                fill="currentColor"></path>
                            </svg>
                        </div>
                        <div className="suggestions__Txt">
                            <span className="suggestions__Big">{val.feature_name||val.primaryAddress}</span>
                            <div className="suggestions__Small">{val.description||val.secondaryAddress}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Suggestions;