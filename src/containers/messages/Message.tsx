import styled from "styled-components";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import {useAppDispatch} from "../../store";
import {IMessage} from "../../store/models/i-message";
import {messagesSlice} from "../../store/slices/messages";
import {UrlGen} from "../../util/url-gen";
import './MessageCenter.scss'

interface IMessageProps {
  message: IMessage
}

export const Message = ({message}: IMessageProps) => {

  const dispatch = useAppDispatch();

  const cancelButtonClicked = () => {
    dispatch(messagesSlice.actions.removeMessage(message.id))
  }

  return (
    <div className={'message'}>
      {message.title && (
        <StyledTitle>{message.title}</StyledTitle>
      )}
      {message.title && message.body && (
        <Spacer size={"sm"}/>
      )}
      {message.body && (
        <StyledText>{message.body}</StyledText>
      )}
      {message.transactionHash && (
        <StyledLink href={UrlGen.getBlockExplorerTxUrl(message.transactionHash)} target="_blank" rel="noopener noreferrer">
          View on Block Explorer
        </StyledLink>
      )}
      {(message.title || message.body) && (
        <Spacer size={"sm"}/>
      )}
      <Spacer size={"sm"}/>
      <StyledCancelButton>
        <Button size={"sm"} onClick={cancelButtonClicked}>OK</Button>
      </StyledCancelButton>
    </div>
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

const StyledLink = styled.a`
font-size: 12px;
  color: ${props => props.theme.color.grey[10]};
`

const StyledMessage = styled.div`

`;
