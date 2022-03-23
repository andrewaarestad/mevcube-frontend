import {createAsyncThunk} from "@reduxjs/toolkit";
import {ethers} from "ethers";
import {MevCube} from "../contracts/mev-cube";
import {Addresses} from "../config/addresses";

interface ICubeContractPollResult {
    state: string,
    version: string
}

export const pollCubeContract = createAsyncThunk(
  'cube/pollCubeContract',
  async (_: void, {dispatch, getState}) => {
    const provider = new ethers.providers.JsonRpcProvider(Addresses.RPC);
    // console.log('setting up contract');
    const contract = new ethers.Contract(MevCube.ADDRESS, MevCube.ABI as any, provider.getSigner(Addresses.MevCube));
    // console.log('Calling contract.getState()', MevCube.ABI);
      const cubeState: string = await contract.getState();
      // console.log('calling getVersion');
      const cubeVersion: string = await contract.getVersion();
    // console.log('contract state: ', result);
    return {
        state: convertToString(cubeState),
        version: convertToString(cubeVersion)
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
