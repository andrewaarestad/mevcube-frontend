import * as React from "react";

import {cubeSlice} from "../../../../store/slices/cube";
import {useAppDispatch} from "../../../../store";
import {CubeDomElement} from "./CubeDomElement/cube-dom-element";
import {useEffect} from "react";
import {useTypedSelector} from "../../../../store/reducers";
import "./CubeWidget.scss"

export default function CubeWidget() {

  const dispatch = useAppDispatch();

  const {currentContractState, pendingMovesResetCounter, pendingMoves, currentScreenState} = useTypedSelector(state => state.cube);

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

    if (pendingMoves.length > 0) {
      // console.log('We have pending moves, setting cube to screenState', currentScreenState)
      CubeDomElement.reset(currentScreenState);
    } else {
      // console.log('No pending moves, updating screen to contract state', currentContractState);
      CubeDomElement.reset(currentContractState);
    }
    CubeDomElement.show();
    return () => {
      CubeDomElement.hide();
    }

    // eslint-disable-next-line
  }, [pendingMovesResetCounter])

  // useEffect(() => {
  //   if (isFirstRender) {
  //     console.log('cube: first render');
  //     setIsFirstRender(false);
  //     CubeDomElement.reset(currentContractState);
  //   } else {
  //     console.log('Cube: contract state changed');
  //     if (pendingMoves.length > 0) {
  //       console.log('We have pending moves, setting cube to screenState', currentScreenState)
  //       CubeDomElement.reset(currentScreenState);
  //     } else {
  //       console.log('No pending moves, updating screen to contract state', currentContractState);
  //       CubeDomElement.reset(currentContractState);
  //     }
  //   }
  //   CubeDomElement.show();
  //   // dispatch(cubeSlice.actions.resetPendingMoves())
  //   return () => {
  //     CubeDomElement.hide();
  //   }
  // }, [currentContractState, isFirstRender])
  //
  // useEffect(() => {
  //   if (!isFirstRender && pendingMovesResetCounter > 0) {
  //     console.log('pendingMovesResetCounter: triggered reset: ', pendingMovesResetCounter);
  //     CubeDomElement.reset(currentContractState);
  //   }
  // }, [isFirstRender, pendingMovesResetCounter])



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


      {/*<div className={'cube-moves-wrapper'}>*/}
      {/*  <CubeMoves/>*/}
      {/*</div>*/}

    </>
  )
}

