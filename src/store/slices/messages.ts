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
    addMessage: (state, action: PayloadAction<{title?: string, body?: string}>) => {
      state.messages.push({
        ...action.payload,
        id: crypto.randomUUID()
      });
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    }
  }
});
