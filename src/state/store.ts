import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { ActionType } from "./action-types";

const applyMiddleware = [thunk]

export const store = configureStore({
    reducer: reducers, 
    // initialState,
    // preloadedState: {},
    //applyMiddleware,
});

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
})

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
})