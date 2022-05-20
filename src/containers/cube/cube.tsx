import * as React from "react";

import {cubeSlice} from "../../store/slices/cube";
import {useAppDispatch} from "../../store";
import {CubeDomElement} from "./cube-dom-element/cube-dom-element";
import {useEffect, useState} from "react";
import {useTypedSelector} from "../../store/reducers";
import {CubeMoves} from "./moves/cube-moves";
import "./Cube.scss"

export default function Cube() {

  const dispatch = useAppDispatch();

  const {currentContractState, pendingMovesResetCounter} = useTypedSelector(state => state.cube);

  const [isFirstRender, setIsFirstRender] = useState(true);

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
    if (isFirstRender) {
      // console.log('cube: first render');
      setIsFirstRender(false);
      CubeDomElement.reset(currentContractState);
    } else {
      console.log('Cube: contract state changed');
      CubeDomElement.reset(currentContractState);
    }
    CubeDomElement.show();
    // dispatch(cubeSlice.actions.resetPendingMoves())
    return () => {
      CubeDomElement.hide();
    }
  }, [currentContractState, isFirstRender])

  useEffect(() => {
    if (!isFirstRender) {
      console.log('pendingMovesResetCounter: triggered reset: ', pendingMovesResetCounter);
      CubeDomElement.reset(currentContractState);
    }
  }, [currentContractState, isFirstRender, pendingMovesResetCounter])



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

      <div className={'cube-dom-element-wrapper'}>
        <div id="cube_dom_element"/>
      </div>

      <div className={'cube-moves-wrapper'}>
        <CubeMoves/>
      </div>

    </>
  )
}

