import * as React from "react";
import {useTypedSelector} from "../../store/reducers";
import Button from "../../components/Button";
import styled from "styled-components";
import Spacer from "../../components/Spacer";
import {useAppDispatch} from "../../store";
import {cubeSlice} from "../../store/slices/cube";
import {sendSubmitSolution} from "../../thunks/submit-solution";
import {useWallet} from "use-wallet";
import {pollCubeContract} from "../../thunks/poll-cube-contract";
import {transactionsSlice} from "../../store/slices/transactions";


export default function PendingMoves() {

  const dispatch = useAppDispatch();
  const {pendingMoves} = useTypedSelector(state => state.cube);
  const {ethereum, account} = useWallet();

  // console.log('PendingMoves.render: ', pendingMoves);

  const onClickSubmitSolution = () => {
    dispatch(transactionsSlice.actions.setIsAwaitingTxConfirmation(true))
    sendSubmitSolution(pendingMoves, dispatch, ethereum, account)
    .then(() => {
      dispatch(transactionsSlice.actions.setIsAwaitingTxConfirmation(false))
      dispatch(pollCubeContract())
    })
    .catch(err => {
      console.log('Error sending solution: ', err);
    })
  }

  const onClickReset = () => {
    dispatch(cubeSlice.actions.resetPendingMoves())
  }

  return (

    <StyledPendingMovesWrapper>

      {pendingMoves.length > 0 && (
        <>


          <Button onClick={() => onClickReset()}>
            Reset
          </Button>

          <Spacer size={"sm"}/>

          {account ? (

            <StyledPendingMovesButtonsWrapper>

              <Button onClick={() => onClickSubmitSolution()}>
                Submit Moves
              </Button>
            </StyledPendingMovesButtonsWrapper>
          ) : (
            <div>
              <p>Connect account to submit solution</p>
            </div>
          )}


          <p>Pending Moves: {pendingMoves.join(' ')}</p>
        </>
      )}
    </StyledPendingMovesWrapper>
  )
}

const StyledPendingMovesWrapper = styled.div`
  position: fixed;
  right: 35px;
  bottom: 30px;

  //display: flex;
  //flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`


const StyledPendingMovesButtonsWrapper = styled.div`
  //position: fixed;
  //right: 35px;
  //bottom: 30px;
  
  display: flex;
  //flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`
