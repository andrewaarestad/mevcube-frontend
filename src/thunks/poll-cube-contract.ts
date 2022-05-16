import {createAsyncThunk} from "@reduxjs/toolkit";
import {ethers} from "ethers";
import {MevCube} from "../contracts/mev-cube";
import Environment from "../config/environment";
import {ICubeTransaction} from "../store/models/i-cube-transaction";
import {historySlice} from "../store/slices/history";

interface ICubeContractPollResult {
    state: string,
    version: string,
    isSolved: boolean,
  currentScrambleRewardHex: string
}

const refreshPastEvents = async() => {
  if (!window.ethereum) {
    console.log('warning, cant get past events without wallet provider');
    return [];
  }
  const web3Contract = MevCube.getContract(window.ethereum)
  return web3Contract.getPastEvents('Solved', {fromBlock: 'earliest'});
}

const refreshContractHistory = async() => {

  const pastEvents = await refreshPastEvents();
  // console.log('pastEvents: ', pastEvents);

  const mappedEvents: Array<ICubeTransaction> = pastEvents.map(event => ({
    blockHash: event.blockHash,
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    solution: {
      _solver: event.returnValues._solver,
      _solution: event.returnValues._solution
    }
  }));

  return mappedEvents.reverse();
}

export const pollCubeContract = createAsyncThunk(
  'cube/pollCubeContract',
  async (_: void, {dispatch, getState}) => {
      const provider = new ethers.providers.JsonRpcProvider(Environment.RPC);
      // console.log('setting up contract');
      const contract = new ethers.Contract(Environment.MevCubeContractAddress, MevCube.ABI as any, provider.getSigner(Environment.MevCubeContractAddress));
      // console.log('Calling contract.getState()', MevCube.ABI);
      const cubeState: string = await contract.getState();
      // console.log('calling getVersion');
    const cubeVersion: string = await contract.getVersion();
    const isSolved: string = await contract.isSolved();
      // console.log('contract state: ', result);

    const currentScrambleReward = await contract.currentScrambleReward();

    const mappedEvents = await refreshContractHistory();

    console.log('contract history: ', mappedEvents);
    console.log('solver reward: ', currentScrambleReward.toString());

    dispatch(historySlice.actions.setMostRecentTransaction(mappedEvents[0]))
    dispatch(historySlice.actions.setRecentMoves(mappedEvents));

      return {
        state: convertToString(cubeState),
        version: convertToString(cubeVersion),
        isSolved: !!isSolved,
        currentScrambleRewardHex: currentScrambleReward.toString()
      } as ICubeContractPollResult;
  }
);

// Convert contract state to frontend state
// Contract state is a string of bytes, e.g. 0x5555555555555555555252525252525252524646464646464646464444444444444444444c4c4c4c4c4c4c4c4c424242424242424242

function convertToString(state: string) {
    let str = '';
    const sliced = state.slice(2).trim();
    // console.log('converting: ', sliced);
    for (let ii=0; ii<sliced.length / 2; ii++) {
        const val = parseInt(sliced.substring(ii * 2, ii * 2 + 2), 16);
        str += String.fromCharCode(val);
    }
    return str;
}
