import {createSlice} from "@reduxjs/toolkit";

interface CubeState {
  pendingMoves: Array<string>
}

const initialState: CubeState = {
  pendingMoves: []
}

export const cubeSlice = createSlice({
  name: 'cube',
  initialState,
  reducers: {
    addPendingMove: (state, action) => {
      state.pendingMoves.push(action.payload);
    }
  }
});
