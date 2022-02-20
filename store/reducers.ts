import {combineReducers} from "@reduxjs/toolkit";
import {cubeSlice} from "./slices/cube";
import {TypedUseSelectorHook, useSelector} from "react-redux";


const rootReducer = combineReducers({
  cube: cubeSlice.reducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
