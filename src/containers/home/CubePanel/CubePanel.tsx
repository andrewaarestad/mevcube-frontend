import React from "react";
import {useTypedSelector} from "../../../store/reducers";
import "./CubePanel.scss"
import CubeWidget from "./CubeWidget/CubeWidget";

export const CubePanel = () => {

  const {flags: {isLoadingInitialCubeContractState}} = useTypedSelector(state => state.cube);

  const {currentContractState} = useTypedSelector(state => state.cube);
  // const currentScrambleRewardHexRef = useRef(currentScrambleRewardHex);


  const {errors} = useTypedSelector(state => state.cube);

  // const suggestScramble = useCallback(() => {
  //   if (contractStateIsSolved) {
  //     callbacks.register(messageId, () => {
  //       console.log('clicked!');
  //     })
  //   }
  // }, [callbacks, contractStateIsSolved, dispatch])



  return (
    <>
      {isLoadingInitialCubeContractState ? (
        <>
          {errors.initialLoad ? (
          <div className={'cube-loading-error'}>
            <p>Looks like we are having technical difficulties.  Please try again later.
              <br/><br/>
              {errors.initialLoad.error.message}
            </p>
          </div>
          ) : (
          <div className={'cube-loading-progress'}>
            <p>Loading...</p>
          </div>
          )}
        </>
      ) : (
        <>
          {currentContractState ? (
            <CubeWidget/>
          ) : (
            <>
              <p>Connect to see cube state</p>
            </>
          )}
        </>
      )}
    </>
  )
}
