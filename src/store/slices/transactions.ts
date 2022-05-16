import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface TransactionsState {
  pendingTxs: Array<string>,
  isAwaitingTxConfirmation: boolean
}


const initialState: TransactionsState = {
  pendingTxs: [],
  isAwaitingTxConfirmation: false
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setIsAwaitingTxConfirmation: (state, action: PayloadAction<{txHash: string, flag: boolean}>) => {
      if (action.payload.flag) {
        state.pendingTxs.push(action.payload.txHash);
      } else {
        state.pendingTxs = state.pendingTxs.filter(tx => tx !== action.payload.txHash);
      }
      state.isAwaitingTxConfirmation = state.pendingTxs.length > 0;
    }
  }
});
