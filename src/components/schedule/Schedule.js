import React, { useState } from "react";
import "antd/dist/antd.min.css";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { messageActions } from "../../state/index";
import "./Schedule.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Schedule = () => {

    const navigate = useNavigate();
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const ride = useSelector(state => state.ride);
    const dispatch = useDispatch();
    const { setMessageData } = bindActionCreators(messageActions, dispatch);

    const handleClick = () => {
        setTimeout(() => {
            setMessageData(`Schedule Successfully Confirmed`);
            setLoading(false);
        }, 2000);
    }

    const Dets = [
        {
            text: "Choose your pickup time up to 30 days in advance",
            svg:
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                <title>Calendar</title>
                <path fillRule="evenodd" clipRule="evenodd" 
                d="M23 8V4h-3V1h-3v3H7V1H4v3H1v4h22zm0 15H1V10h22v13zM8 14H5v3h3v-3z" 
                fill="currentColor"></path>
            </svg>
        },
        {
            text: "Extra wait time included to meet your ride",
            svg:
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                <title>Hourglass</title>
                <path d="M19 5.5V4h1V1H4v3h1v1.5c0 2.95 1.83 5.47 4.41 6.5A7.002 7.002 0 005 18.5V20H4v3h16v-3h-1v-1.5c0-2.95-1.83-5.47-4.41-6.5A7.002 7.002 0 0019 5.5zM16 4v1.5c0 .53-.11 1.04-.3 1.5H8.3c-.19-.46-.3-.97-.3-1.5V4h8zm0 14.5V20H8v-1.5c0-2.21 1.79-4 4-4s4 1.79 4 4z" 
                fill="currentColor"></path>
            </svg>
        },
        {
            text: "Cancel at no charge up to 60 mins in advance",
            svg:
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                <title>Credit card</title>
                <path fillRule="evenodd" clipRule="evenodd" 
                d="M1 4h22v4H1V4zm0 7h22v9H1v-9z" fill="currentColor"></path>
            </svg>  
        }
    ]

    return (
        <div className="schedule_container">
            <div className="schedule_wrapper">
                <div className="schedule_content">
                    <div className="schedule_top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                        strokeLinejoin="round" className="x" style={{color: "black"}} 
                        onClick={() => navigate(-1)}>
                            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <h1>When do you want to leave for {ride?.destination?.primaryAddress || ""} ?</h1>
                    <span className="thick_med">From {ride?.pickup?.primaryAddress || ""}</span>
                    <div className="timeanddate">
                        {/* <input placeholder="Select Date" type="date" /> */}
                        <div className="antContainer">
                            <DatePicker className="date_plain_picker"
                                disabledDate={(current) => { return current < moment().startOf('day') }}
                                onChange={(value) => {
                                    const val = moment(value).format("DD-MM-YYYY");
                                    setDate(val);
                                }}
                            />
                        </div>
                        {/* <input placeholder="Select Time" type="time" /> */}
                        <div className="antContainer">
                            <TimePicker format="HH:mm" defaultValue={moment('12:00', "HH:mm")} 
                            onSelected={(value) => {
                                const timeStr = moment(value).format("HH:mm");
                                setTime(timeStr);
                            }}/>
                        </div>
                    </div>
                    <div className="schedule_scroll">
                        <ul className="schedule_dets">
                            {Dets.map((val, idx) => (
                                <li key={idx}>
                                    {val.svg}
                                    <span className="thick_med">{val.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="schedule_fixed">
                        <Button label="Confirm" handleClick={handleClick} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule;