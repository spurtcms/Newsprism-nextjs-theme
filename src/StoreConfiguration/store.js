import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer,} from 'redux-persist'
import rootReducer from './rootReducers';
import storage from "./customStorage";



const persistConfig = {
  key: "root",
  storage,
  blacklist: ["register"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: function (getDefaultMiddleware) {
      return getDefaultMiddleware();
    },
  });
}


export function persistAppStore(store) {
  return persistStore(store);
}


