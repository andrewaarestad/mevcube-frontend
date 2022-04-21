import {combineReducers} from "@reduxjs/toolkit";
import {cubeSlice} from "./slices/cube";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {navSlice} from "./slices/nav";
import {historySlice} from "./slices/history";
import {transactionsSlice} from "./slices/transactions";
import {messagesSlice} from "./slices/messages";


const rootReducer = combineReducers({
  cube: cubeSlice.reducer,
  history: historySlice.reducer,
  messages: messagesSlice.reducer,
  nav: navSlice.reducer,
  transactions: transactionsSlice.reducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
