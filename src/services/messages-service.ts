import {messagesSlice} from "../store/slices/messages";
import {AppDispatch} from "../store";

export class MessagesService {
  public static createMessage(dispatch: AppDispatch, title: string, body: string, account?: string) {
    const id = crypto.randomUUID();
    dispatch(messagesSlice.actions.addMessage({
      id,
      title,
      body
    }));
    return id;
  }
}
