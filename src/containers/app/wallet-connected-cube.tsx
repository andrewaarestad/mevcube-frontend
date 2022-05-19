import {CubeLoading} from "./cube-loading";
import {CubeLoaded} from "./cube-loaded";
import React, {useEffect, useRef} from "react";
import {useTypedSelector} from "../../store/reducers";
import {useAppDispatch} from "../../store";
import {MessagesService} from "../../services/messages-service";
import {ethers} from "ethers";
import {BigNumber} from '@ethersproject/bignumber';

export const WalletConnectedCube = () => {

  const dispatch = useAppDispatch();
  const {flags: {isLoadingInitialCubeContractState}, contractStateIsSolved, currentScrambleRewardHex} = useTypedSelector(state => state.cube);

  const currentScrambleRewardHexRef = useRef(currentScrambleRewardHex);
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
        <CubeLoading/>
      ) : (
        <CubeLoaded/>
      )}
    </>
  )
}
