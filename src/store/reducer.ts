import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";

const reducer = combineReducers({
  event: eventReducer,
});

export default reducer;
