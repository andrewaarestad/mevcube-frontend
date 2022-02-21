import {useWallet} from "use-wallet";
import {ethers} from "ethers";

import {useEffect} from "react";
import {useAppDispatch} from "../store";
import {pollCubeContract} from "../thunks/poll-cube-contract";
import {useTypedSelector} from "../store/reducers";

export const CubeProvider = (): null => {

  // console.log('CubeProvider.render');

  const wallet = useWallet()
  const dispatch = useAppDispatch();

  const {isLoadingInitialCubeContractState, isRefreshingCubeState} = useTypedSelector(state => state.cube.flags)


  const poll = async() => {
    // console.log('poll()')
    if (wallet.ethereum) {
      dispatch(pollCubeContract());
    } else {
      // console.log('not connected');
    }
  }

  useEffect(() => {
    const pollInterval = setInterval(() => {
      poll()
      .catch(err => {
        console.error('Error polling cube contract: ', err);
      })
    }, 10000);

    return () => {
      clearInterval(pollInterval);
    }
  }, [])

  if (isLoadingInitialCubeContractState && !isRefreshingCubeState) {
    // Call this outside render loop
    setTimeout(poll, 1);
    // poll();
  }

  return null;
}
