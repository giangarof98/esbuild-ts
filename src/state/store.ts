import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

const applyMiddleware = [thunk]

export const store = configureStore({
    reducer: reducers, 
    // initialState,
    // preloadedState: {},
    //applyMiddleware,
});