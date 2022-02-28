import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum CurrentScreen {
  Home,
  About
}

interface NavState {
  currentScreen: CurrentScreen;
}


const initialState: NavState = {
  currentScreen: CurrentScreen.Home
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setCurrentScreen: (state, action: PayloadAction<CurrentScreen>) => {
      state.currentScreen = action.payload;
      console.log('set current screen: ', state.currentScreen);
    }
  }
});
