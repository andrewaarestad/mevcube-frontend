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

  // useEffect(() => {
  //   if (!isLoadingInitialCubeContractState && contractStateIsSolved) {
  //     console.log('done loading initial contract state');
  //     console.log('parsing solver reward: ', currentScrambleRewardHex, currentScrambleRewardHexRef.current);
  //     MessagesService.createMessage(dispatch, {
  //       title: 'Scramble the cube!',
  //       body: 'The cube is currently solved.  Why don\'t you try scrambling it? The reward for scrambling is currently ' + ethers.utils.formatEther(BigNumber.from(currentScrambleRewardHex).toString()).toString() + ' MATIC'
  //     });
  //     // suggestScramble();
  //   }
  // }, [isLoadingInitialCubeContractState, contractStateIsSolved, dispatch]);

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
