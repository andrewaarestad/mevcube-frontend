import * as React from "react";

import PendingMoves from "./pending-moves";
import {cubeSlice} from "../../store/slices/cube";
import {useAppDispatch} from "../../store";
import {CubeDomElement} from "./cube-dom-element";
import {CurrentState} from "./current-state";
import {useEffect} from "react";
import {useTypedSelector} from "../../store/reducers";
import {sendScrambleCube} from "../../thunks/scramble-cube";
import {useWallet} from "use-wallet";
import {sendResetCube} from "../../thunks/reset-cube";
import {pollCubeContract} from "../../thunks/poll-cube-contract";
import Button from "../Button";
import styled from "styled-components";
import Spacer from "../Spacer";

export default function Cube() {

  const dispatch = useAppDispatch();
  const {ethereum, account, chainId} = useWallet();

  // console.log('ethereum: ', ethereum)
  // console.log('chainId: ', chainId)

  const {currentContractState, pendingMovesResetCounter} = useTypedSelector(state => state.cube);

  CubeDomElement.delegate = {
    // triggered by user interacting with the cube
    onUserMove(moves: string[], state: string) {
      dispatch(cubeSlice.actions.addPendingMoves(moves));
      dispatch(cubeSlice.actions.setCurrentScreenState(state));
    },
    // triggered by automatic state changes e.g. randomizer
    onStateChange(state: string) {
      dispatch(cubeSlice.actions.setCurrentScreenState(state));
    }
  }

  useEffect(() => {
    console.log('Cube: contract state changed');
    CubeDomElement.reset(currentContractState);
    CubeDomElement.show();
    dispatch(cubeSlice.actions.resetPendingMoves())
    return () => {
      CubeDomElement.hide();
    }
  }, [currentContractState])

  useEffect(() => {

    CubeDomElement.reset(currentContractState);
  }, [pendingMovesResetCounter])

  const onClickScramble = () => {
    sendScrambleCube(dispatch, ethereum, account)
    .then(() => dispatch(pollCubeContract()))
    .catch(err => {
      console.error('Error scrambling cube: ', err);
    })
  }

  const onClickReset = () => {
    sendResetCube(dispatch, ethereum, account)
    .then(() => dispatch(pollCubeContract()))
    .catch(err => {
      console.error('Error resetting cube: ', err);
    })
  }

  // const onClickRandom = () => {
  //   CubeDomElement.random()
  //   .then(() => {
  //     console.log('done randomizing');
  //   })
  //   .catch(err => {
  //     console.error('Error randomizing: ', err);
  //   })
  // }

  // console.log('Cube.render');

  return (
    <>

      <PendingMoves />
      {/*<CurrentState/>*/}


      <StyledRibbonWrapper>
        <Button onClick={() => onClickScramble()}>
          Scramble
        </Button>
        <Spacer size={"sm"}/>
        <Button onClick={() => onClickReset()}>
          Cheat
        </Button>
      </StyledRibbonWrapper>


      {/*<div id="ribbon">*/}
      {/*  <Button onClick={() => onClickScramble()}>*/}
      {/*    Scramble*/}
      {/*  </Button>*/}
      {/*  <Button onClick={() => onClickReset()}>*/}
      {/*    Reset*/}
      {/*  </Button>*/}
      {/*  /!*<div className="btn" id="scramble" onClick={() => onClickScramble()}>Scramble</div>*!/*/}
      {/*  /!*<div className="btn" id="random" onClick={() => onClickRandom()}>Random</div>*!/*/}
      {/*  /!*<div className="btn" id="reset" onClick={() => onClickReset()}>Reset</div>*!/*/}
      {/*</div>*/}



      <div id="progressbar"/>

    </>
  )
}

const StyledRibbonWrapper = styled.div`
  position: fixed;
  right: 35px;
  bottom: 30px;
  
  //display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`
