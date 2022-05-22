import styled from "styled-components";
import {useTypedSelector} from "../../store/reducers";
import {Message} from "./Message";

export const MessageCenter = () => {

  const {messages} = useTypedSelector(state => state.messages);

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



