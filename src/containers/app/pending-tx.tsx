import styled from "styled-components";

export const PendingTx = () => {
  return (
    <StyledPendingTxWrapper>
      <StyledTitle>
        <p>Pending Transaction</p>
      </StyledTitle>
      <br/>
      <StyledText>
        <p>Your moves have been submitted and we are waiting for confirmation...</p>
        <p>View transactions</p>
      </StyledText>
    </StyledPendingTxWrapper>
  )
}

const StyledTitle = styled.div`
font-size: 16px;
`

const StyledText = styled.div`
font-size: 12px;
`

const StyledPendingTxWrapper = styled.div`
  position: fixed;
  left: 35px;
  bottom: 30px;
  
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
`

// const StyledPendingTxWrapper = styled.div`
//   //position: fixed;
//   //right: 35px;
//   //bottom: 30px;
//
//   display: flex;
//   //flex-wrap: wrap;
//   @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
//     flex-direction: column;
//     flex-wrap: nowrap;
//   }
// `
