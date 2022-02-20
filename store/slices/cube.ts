import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const defaultCubeState = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';

interface CubeState {
  pendingMoves: Array<string>
  currentScreenState: string
}

const initialState: CubeState = {
  pendingMoves: [],
  currentScreenState: defaultCubeState
}

export const cubeSlice = createSlice({
  name: 'cube',
  initialState,
  reducers: {
    addPendingMoves: (state, action: PayloadAction<string[]>) => {
      state.pendingMoves.push(...action.payload);
    },
    setCurrentScreenState: (state, action: PayloadAction<string>) => {
      state.currentScreenState = action.payload
    },
    reset: (state) => {
      state.currentScreenState = defaultCubeState;
      state.pendingMoves = [];
    }
  }
});
