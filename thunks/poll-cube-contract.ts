import {createAsyncThunk} from "@reduxjs/toolkit";
import {ethers} from "ethers";

import * as cubeAbi from '../abis/MevCube.json'

const contractAddress = '0x0E801D84Fa97b50751Dbf25036d067dCf18858bF';

export const pollCubeContract = createAsyncThunk(
  'cube/pollCubeContract',
  async (_: void, {dispatch, getState}) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress, cubeAbi.abi, provider.getSigner());
    // console.log('Calling contract.getState()');
    const result: string = await contract.getState();
    // console.log('contract state: ', result);
    return convertToString(result);
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
