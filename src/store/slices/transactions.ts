import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface TransactionsState {
  isAwaitingTxConfirmation: boolean
}


const initialState: TransactionsState = {
  isAwaitingTxConfirmation: false
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setIsAwaitingTxConfirmation: (state, action: PayloadAction<boolean>) => {
      state.isAwaitingTxConfirmation = action.payload;
    }
  }
});
