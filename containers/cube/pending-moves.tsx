import * as React from "react";
import {RubikCube} from "./cube-dom-element/models/rubik-cube";
import {useTypedSelector} from "../../store/reducers";
import Button from "../../components/Button";
import styled from "styled-components";
import Spacer from "../../components/Spacer";
import {useAppDispatch} from "../../store";
import {cubeSlice} from "../../store/slices/cube";
import {sendSubmitSolution} from "../../thunks/submit-solution";
import {useWallet} from "use-wallet";
import {pollCubeContract} from "../../thunks/poll-cube-contract";


export default function PendingMoves() {

  const dispatch = useAppDispatch();
  const {pendingMoves} = useTypedSelector(state => state.cube);
  const {ethereum, account} = useWallet();

  // console.log('PendingMoves.render: ', pendingMoves);

  const onClickSubmitSolution = () => {
    sendSubmitSolution(pendingMoves, dispatch, ethereum, account)
    .then(() => {
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
                Submit Solution
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
    flex-wrap: none;
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
    flex-wrap: none;
  }
`
