import styled from "styled-components";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import {useAppDispatch} from "../../store";
import {IMessage} from "../../store/models/i-message";
import {messagesSlice} from "../../store/slices/messages";

interface IMessageProps {
  message: IMessage
}

export const Message = ({message}: IMessageProps) => {

  const dispatch = useAppDispatch();

  const cancelButtonClicked = () => {
    dispatch(messagesSlice.actions.removeMessage(message.id))
  }

  return (
    <StyledMessage>
      {message.title && (
        <StyledTitle>{message.title}</StyledTitle>
      )}
      {message.title && message.body && (
        <Spacer size={"sm"}/>
      )}
      {message.body && (
        <StyledText>{message.body}</StyledText>
      )}
      {(message.title || message.body) && (
        <Spacer size={"sm"}/>
      )}
      <Spacer size={"sm"}/>
      <StyledCancelButton>
        <Button size={"sm"} onClick={cancelButtonClicked}>OK</Button>
      </StyledCancelButton>
    </StyledMessage>
  )
}

const StyledCancelButton = styled.div`
  right: 10px;
  top: 10px;
`

const StyledTitle = styled.div`
font-size: 14px;
`

const StyledText = styled.div`
font-size: 12px;
`

const StyledMessage = styled.div`
  //position: fixed;
  //left: 35px;
  //bottom: 30px;

  border: solid;

  background-color: ${props => props.theme.color.grey[100]};
  border-color: ${props => props.theme.color.grey[100]};
  color: ${props => props.theme.color.grey[10]};
  //display: flex;
  padding: 1rem;

  border-width: 2px;
  border-radius: 8px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;
