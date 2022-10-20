import React, { useState, useEffect, useRef } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { errorActions, userActions } from "../../state";
import "./Map.css";
import LoadingSpinner from "../loading/loading";
import { authorizeUserAndGetApiKey } from "../../Services/MapServices/MapsServices";
import { getMidPoint } from "./MapUtil";
import mapboxgl from "mapbox-gl";
import bbox from "@turf/bbox";

const Mapbox = () => {

    const [viewState, setViewState] = useState({
        latitude: 37.75, 
        longitude: 122.42,
        zoom: 12,
        dragPan: true
    });

    const ride = useSelector(state => state.ride);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { setErrorData } = bindActionCreators(errorActions, dispatch);
    const { setUserData } = bindActionCreators(userActions, dispatch);
    const [currentData, setCurrentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accesstoken, setAccesstoken] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const mapRef = useRef(null);
    const pinStyle = {
        cursor: 'pointer',
        fill: '#d00',
        stroke: 'none'
    };

    useEffect(() => {
        if(ride?.pickup?.coordinates && ride?.destination?.coordinates) {
            const { pickup, destination } = ride;
            const latlng = [
                [(pickup.coordinates.lng)-0, pickup.coordinates.lat-0],
                [destination.coordinates.lng-0, destination.coordinates.lat-0]
            ];

            setCurrentData({
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: latlng,
                }
            })
            
            if(mapboxgl) {
                const sw = new mapboxgl.LngLat(pickup.coordinates.lng,pickup.coordinates.lat);
                const ne = new mapboxgl.LngLat(destination.coordinates.lng, destination.coordinates.lat);
                const bounds = new mapboxgl.LngLatBounds(sw, ne);
                const LngLat = bounds.getSouthWest();
                const LngLat2 = bounds.getNorthEast();
                if(mapRef.current) {
                    mapRef.current.fitBounds([
                        [LngLat.lng, LngLat.lat],
                        [LngLat2.lng, LngLat2.lat]
                    ]);
                }
            }

        } else {

            if(ride?.pickup?.coordinates) {
                const { lat, lng } = ride.pickup.coordinates;
                setViewState({
                    ...viewState,
                    latitude: lat,
                    longitude: lng
                })
            } 
            if(ride?.destination?.coordinates) {
                const { lat, lng } = ride.destination.coordinates;
                setViewState({
                    ...viewState,
                    latitude: lat,
                    longitude: lng
                })
            } 
            
        }

    }, [ride.pickup, ride.destination]);

    
    useEffect(() => {
        authorizeUserAndGetApiKey(user).then(res => {
            if(res.data.status === "failed") return setErrorData(res.data.message);
            setAuthorized(true);
            const { SESSION_TOKEN, ACCESS_TOKEN } = res.data;
            setAccesstoken(ACCESS_TOKEN);
            mapboxgl.accessToken = ACCESS_TOKEN;
            
            setLoading(false);
        }).catch(err => {
            setErrorData(err.message==="Network Error"?err.message:err.response?.message||"Sorry Something Went Wrong Check Internet and Try Again");
        })

    }, []);

    if(loading) {
        return (
            <div className="Map">
                <LoadingSpinner width={"100px"} height={"100px"} />
            </div>
        )
    } else {
        if(authorized) {
            return (
                <Map {...viewState} ref={mapRef}
                style={{width: "100%",height:"100%"}}
                mapboxAccessToken={accesstoken}
                onMove={e => setViewState(e.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v9">
                    {ride.pickup && 
                        <Marker longitude={ride.pickup.coordinates.lng-0}
                        latitude={ride.pickup.coordinates.lat-0}
                        offsetLeft={-20} offsetTop={-10}>
                            <div className="Marker">
                                <div className="Marker__Img">
                                    <svg 
                                        height={20}
                                        viewBox="0 0 24 24"
                                        style={{...pinStyle}}
                                       
                                    >
                                        <path d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3 c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9 C20.1,15.8,20.2,15.8,20.2,15.7z" />
                                    </svg>
                                </div>
                                <div className="Marker__text">From: {ride.pickup.primaryAddress}</div>
                            </div>
                        </Marker>
                    }
                    {ride.destination && 
                        <Marker longitude={ride.destination.coordinates.lng-0}
                        latitude={ride.destination.coordinates.lat-0}>
                            <div className="Marker">
                                <div className="Marker__Img">
                                    <svg 
                                        height={20}
                                        viewBox="0 0 24 24"
                                        style={{...pinStyle}}
                                       
                                    >
                                        <path d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3 c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9 C20.1,15.8,20.2,15.8,20.2,15.7z" />
                                    </svg>
                                </div>
                                <div className="Marker__text">To: {ride.destination.primaryAddress}</div>
                            </div>
                        </Marker>
                    }
                    {currentData && 
                        <Source id="polylineLayer" 
                        type="geojson" data={currentData}>
                            <Layer 
                                id="lineLayer"
                                type="line" source="my-data"
                                layout={{
                                    "line-join": "round",
                                    "line-cap": "round",
                                }}
                                paint={{
                                    "line-color": "black",
                                    "line-width": 3
                                }} 
                            />
                        </Source>
                    }
                </Map>
            )
        } else {
            return (
                <div className="MapError">
                    <span>You Are Not Authorized To Use This Map Service Here</span>
                </div>
            )
        }
    }
}

export default Mapbox;