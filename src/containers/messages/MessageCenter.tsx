import {useTypedSelector} from "../../store/reducers";
import {Message} from "./Message";
import "./MessageCenter.scss"

export const MessageCenter = () => {

  const {messages} = useTypedSelector(state => state.messages);

  console.log('MessageCenter: messages: ', messages);

  return (
    <div className={'message-center-wrapper'}>
      {messages.length > 0 && (
        <>
          <Message message={messages[0]}/>
        </>
      )}
      {/*<p>{messages.length} messages</p>*/}
    </div>
  )
}



