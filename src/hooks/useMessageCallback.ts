import {useTypedSelector} from "../store/reducers";
import {useEffect, useMemo} from "react";

export const useMessageCallback = () => {

  const {messages} = useTypedSelector(state => state.messages);

  const currentCallbacks = useMemo<{[key: string]: () => void}>(() => ({}), []);

  useEffect(() => {
    Object.keys(currentCallbacks).forEach(messageId => {
      if (!messages.map(message => message.id).includes(messageId)) {
        console.log('ready to fire callback for message ' + messageId);
        currentCallbacks[messageId]();
        delete currentCallbacks[messageId];
      }
    })
  }, [currentCallbacks, messages])

  return {
    callbacks: {
      register: (messageId: string, callback: () => void) => {
        currentCallbacks[messageId] = callback;
      }
    }
  }
}
