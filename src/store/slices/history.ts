import {createSlice} from "@reduxjs/toolkit";
import {ICubeTransaction} from "../models/i-cube-transaction";

interface IHistorySlice {
  recentMoves: Array<ICubeTransaction>
  mostRecentTransaction: ICubeTransaction | undefined
}

const initialState: IHistorySlice = {
  recentMoves: [],
  mostRecentTransaction: undefined
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setRecentMoves: (state, action) => {
      state.recentMoves = action.payload;
    },
    setMostRecentTransaction: (state, action) => {
      state.mostRecentTransaction = action.payload;
    }
  }
});
