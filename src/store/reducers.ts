import {combineReducers} from "@reduxjs/toolkit";
import {cubeSlice} from "./slices/cube";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {navSlice} from "./slices/nav";
import {historySlice} from "./slices/history";


const rootReducer = combineReducers({
  cube: cubeSlice.reducer,
  nav: navSlice.reducer,
  history: historySlice.reducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
