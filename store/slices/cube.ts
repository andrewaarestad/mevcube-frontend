import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {pollCubeContract} from "../../thunks/poll-cube-contract";
// import {scrambleCube} from "../../thunks/scramble-cube";

const defaultCubeState = 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB';


interface ICubeStateFlags {
  isLoadingInitialCubeContractState: boolean
  isRefreshingCubeState: boolean
}

interface ICubeStateErrors {
  initialLoad?: any
}

interface CubeState {
  pendingMoves: Array<string>
  pendingMovesResetCounter: number
  currentScreenState: string
  currentContractState: string | undefined
  flags: ICubeStateFlags,
  errors: ICubeStateErrors
}


const initialState: CubeState = {
  pendingMoves: [],
  pendingMovesResetCounter: 0,
  currentScreenState: defaultCubeState,
  currentContractState: undefined,
  flags: {
    isLoadingInitialCubeContractState: true,
    isRefreshingCubeState: false
  },
  errors: {}
}

export const cubeSlice = createSlice({
  name: 'cube',
  initialState,
  reducers: {
    addPendingMoves: (state, action: PayloadAction<string[]>) => {
      const currentMoves = [...state.pendingMoves, ...action.payload];
      // console.log('current moves: ', currentMoves)
      state.pendingMoves = [];
      for (let ii=0; ii<currentMoves.length; ii++) {
        if (ii === currentMoves.length-1) {
          state.pendingMoves.push(currentMoves[ii]);
        } else {
          if (currentMoves[ii].toLowerCase() === currentMoves[ii+1].toLowerCase() && currentMoves[ii] !== currentMoves[ii+1]) {
            ii++;
            continue;
          }
          state.pendingMoves.push(currentMoves[ii]);
        }
      }
      // console.log('pending moves: ', state.pendingMoves);
    },
    setCurrentScreenState: (state, action: PayloadAction<string>) => {
      state.currentScreenState = action.payload;
    },
    resetPendingMoves: (state) => {
      // console.log('resetPendingMoves reducer');
      state.pendingMoves = [];
      state.pendingMovesResetCounter++;
      state.currentScreenState = state.currentContractState;
    }
  },
  extraReducers: ({addCase}) => {
    // addCase(scrambleCube.rejected, (state, error) => {
    //   console.log('scrambleCube.rejected: ', error.error);
    // });
    addCase(pollCubeContract.rejected, (state, error) => {
      console.log('pollCubeContract.rejected: ', error.error);
      if (state.flags.isLoadingInitialCubeContractState) {
        state.errors.initialLoad = error;
      }
    });
    addCase(pollCubeContract.pending, (state, action) => {
      // console.log('pollCubeContract.pending');
      state.flags.isRefreshingCubeState = true;
    });
    addCase(pollCubeContract.fulfilled, (state, action) => {
      state.currentContractState = action.payload;
      state.flags.isLoadingInitialCubeContractState = false;
      state.flags.isRefreshingCubeState = false;
      state.errors.initialLoad = undefined;
    })
  }
});
