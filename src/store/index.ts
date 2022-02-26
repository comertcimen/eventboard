import { createStore } from "redux";
import { persistStore } from "redux-persist";
import reducer from "./reducer";

const store = createStore(reducer);
const persister = persistStore(store);

export { store, persister };
