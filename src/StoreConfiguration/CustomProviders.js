"use client";
import { makeStore, persistAppStore } from "./store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

 const CustomProviders = ({ children }) => {
  const storeRef = useRef(null);
  const persistorRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistAppStore(storeRef.current);
  }

  useEffect(() => {
    if (storeRef.current) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (persistorRef.current) {
      persistorRef.current.persist();
    }
  }, [persistorRef]);
  return (process.env.NODE_ENV==="development"?
      <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistorRef.current}>
          {children}
        </PersistGate>
      </Provider>:<Provider store={storeRef.current}>{children}</Provider>)
}
export default CustomProviders;
