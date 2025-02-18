// redux/rootReducer.js
import { combineReducers } from "redux";

import customerRedux from "./slices/customer";

const rootReducer = combineReducers({
  customerRedux,
});

export default rootReducer;