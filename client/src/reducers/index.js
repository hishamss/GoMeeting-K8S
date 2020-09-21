import eventsReducer from "./allEvents";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  eventsReducer,
});

export default allReducers;
