import * as React from "react";
import {RubikCube} from "./models/rubik-cube";
import {useTypedSelector} from "../../store/reducers";
import Button from "../Button";
import styled from "styled-components";
import Spacer from "../Spacer";
import {useAppDispatch} from "../../store";
import {cubeSlice} from "../../store/slices/cube";


export default function PendingMoves() {

  const dispatch = useAppDispatch();
  const {pendingMoves} = useTypedSelector(state => state.cube);

  // console.log('PendingMoves.render: ', pendingMoves);

  const onClickSubmitSolution = () => {

  }

  const onClickReset = () => {
    dispatch(cubeSlice.actions.resetPendingMoves())
  }

  return (

    <div id="pending">
      <p>Pending Moves: {pendingMoves.join(' ')}</p>

      {pendingMoves.length > 0 && (
        <StyledPendingMovesButtonsWrapper>

          <Button onClick={() => onClickSubmitSolution()}>
            Submit Solution
          </Button>
          <Spacer size={"sm"}/>
          <Button onClick={() => onClickReset()}>
            Reset
          </Button>
        </StyledPendingMovesButtonsWrapper>
      )}

    </div>
  )
}

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
