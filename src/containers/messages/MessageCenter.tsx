import styled from "styled-components";
import {useTypedSelector} from "../../store/reducers";
import {Message} from "./Message";

export const MessageCenter = () => {

  const {messages} = useTypedSelector(state => state.messages);

  return (
    <StyledMessageCenter>
      {messages.length > 0 ? (
        <>
          <Message message={messages[0]}/>
        </>
      ) : (
        <>
          <p>No Messages</p>
        </>
      )}
      {/*<p>{messages.length} messages</p>*/}
    </StyledMessageCenter>
  )
}


const StyledMessageCenter = styled.div`
  position: fixed;
  left: 35px;
  bottom: 30px;
  width: 25%;
  padding: 1rem;

  //border: solid;
  background-color: green;
  // background-color: ${props => props.theme.color.grey[100]};
  // border-color: ${props => props.theme.color.grey[100]};
  // color: ${props => props.theme.color.grey[10]};
  //display: flex;
  //padding: 1rem;

  //border-width: 2px;
  //border-radius: 8px;

  // @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
  //   flex-direction: column;
  //   flex-wrap: nowrap;
  // }
`

