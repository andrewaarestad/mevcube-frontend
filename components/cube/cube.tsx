import * as React from "react";

import PendingMoves from "./pending-moves";
import {cubeSlice} from "../../store/slices/cube";
import {useAppDispatch} from "../../store";
import {CubeDomElement} from "./cube-dom-element";
import {CurrentState} from "./current-state";
import {useEffect} from "react";
import {useTypedSelector} from "../../store/reducers";
import {doScrambleCube, scrambleCube} from "../../thunks/scramble-cube";
import {useWallet} from "use-wallet";

export default function Cube() {

  const dispatch = useAppDispatch();
  const {ethereum, account} = useWallet();

  const {currentContractState} = useTypedSelector(state => state.cube);

  CubeDomElement.delegate = {
    onUserMove(moves: string[], state: string) {
      dispatch(cubeSlice.actions.addPendingMoves(moves));
      dispatch(cubeSlice.actions.setCurrentScreenState(state));
    },
    onStateChange(state: string) {
      dispatch(cubeSlice.actions.setCurrentScreenState(state));
    }
  }

  useEffect(() => {
    CubeDomElement.reset(currentContractState);
    CubeDomElement.show();
    return () => {
      CubeDomElement.hide();
    }
  }, [])

  const onClickScramble = () => {
    console.log('dispatch scrambleCube: ', ethereum);
    doScrambleCube(dispatch, ethereum, account);
    // dispatch(scrambleCube(ethereum));
  }

  const onClickRandom = () => {
    CubeDomElement.random()
    .then(() => {
      console.log('done randomizing');
    })
    .catch(err => {
      console.error('Error randomizing: ', err);
    })
  }

  const onClickReset = () => {
    dispatch(cubeSlice.actions.reset());
    CubeDomElement.reset()
  }

  // console.log('Cube.render');

  return (
    <>

      <PendingMoves />
      <CurrentState/>


      <div id="ribbon">
        <div className="btn" id="scramble" onClick={() => onClickScramble()}>Scramble</div>
        <div className="btn" id="random" onClick={() => onClickRandom()}>Random</div>
        <div className="btn" id="reset" onClick={() => onClickReset()}>Reset</div>
      </div>



      <div id="progressbar"/>

    </>
  )
}
