import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {pollCubeContract} from "../../thunks/poll-cube-contract";
// import {scrambleCube} from "../../thunks/scramble-cube";

const defaultCubeState = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';


interface ICubeStateFlags {
  isLoadingInitialCubeContractState: boolean
  isRefreshingCubeState: boolean
}

interface CubeState {
  pendingMoves: Array<string>
  currentScreenState: string
  currentContractState: string | undefined
  flags: ICubeStateFlags
}


const initialState: CubeState = {
  pendingMoves: [],
  currentScreenState: defaultCubeState,
  currentContractState: undefined,
  flags: {
    isLoadingInitialCubeContractState: true,
    isRefreshingCubeState: false
  }
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
  },
  extraReducers: ({addCase}) => {
    // addCase(scrambleCube.rejected, (state, error) => {
    //   console.log('scrambleCube.rejected: ', error.error);
    // });
    addCase(pollCubeContract.rejected, (state, error) => {
      console.log('pollCubeContract.rejected: ', error.error);
    });
    addCase(pollCubeContract.pending, (state, action) => {
      state.flags.isRefreshingCubeState = true;
    });
    addCase(pollCubeContract.fulfilled, (state, action) => {
      state.currentContractState = action.payload;
      state.flags.isLoadingInitialCubeContractState = false;
      state.flags.isRefreshingCubeState = false;
    })
  }
});
