import {messagesSlice} from "../store/slices/messages";
import {AppDispatch} from "../store";
import {IDraftMessage} from "../store/models/i-message";

export class MessagesService {
  public static createMessage(dispatch: AppDispatch, message: IDraftMessage) {
    const id = crypto.randomUUID();
    dispatch(messagesSlice.actions.addMessage({
      ...message,
      id
    }));
    return id;
  }
}
