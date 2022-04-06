import {createSlice} from "@reduxjs/toolkit";

interface IHistorySlice {
  recentMoves: Array<any>
}

const initialState: IHistorySlice = {
  recentMoves: []
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setRecentMoves: (state, action) => {
      state.recentMoves = action.payload;
    }
  }
});
