import { combineReducers } from "redux";
import userReducer from "./user";
import rideReducer from "./ride";
import hotelReducer from "./hotel";
import errorReducer from "./error";
import driverReducer from "./driver";
import messageReducer from "./message";
import walletReducer from "./wallet";

const reducers = combineReducers({
    user: userReducer,
    ride: rideReducer,
    hotel: hotelReducer,
    error: errorReducer,
    driver: driverReducer,
    message: messageReducer,
    wallet: walletReducer
});

export default reducers;