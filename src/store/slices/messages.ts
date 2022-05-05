import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../models/i-message";


interface MessagesState {
  messages: Array<IMessage>
}


const initialState: MessagesState = {
  messages: []
}

export const messagesSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
      if (state.messages.length > 3) {
        state.messages = state.messages.slice(0, state.messages.length - 1);
      }
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    }
  }
});
