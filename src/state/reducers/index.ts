import { combineReducers } from "redux";
import bundlesReducers from './bundlesReducers'
import cellsReducers from './cellsReducers';

const reducers = combineReducers({
    cells: cellsReducers,
    bundles: bundlesReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;