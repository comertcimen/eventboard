import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountReducer from "./accountReducer";

const reducer = combineReducers({
  account: persistReducer(
    {
      key: "account",
      storage,
      keyPrefix: "cmrt-",
    },
    accountReducer
  ),
});

export default reducer;
