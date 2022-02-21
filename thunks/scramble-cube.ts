import {createAsyncThunk, Dispatch} from "@reduxjs/toolkit";
import {ethers} from "ethers";

import MevCube from '../abis/MevCube.json'
import Web3 from "web3";

const contractAddress = '0x0E801D84Fa97b50751Dbf25036d067dCf18858bF';

interface IScrambleCubeProps {
  ethereum: any
}

export const scrambleCube = createAsyncThunk(
  'cube/scrambleCube',
  async ({ethereum}: IScrambleCubeProps, {dispatch, getState}) => {

      // const {ethereum} = useWallet();
      console.log('ethereum: ', ethereum);

    // const provider = new ethers.providers.JsonRpcProvider();
    // const contract = new ethers.Contract(contractAddress, MevCube.abi, ethereum);
    const contract = new ethereum.eth.Contract(MevCube.abi, contractAddress)

    console.log('calling contract.scramble()');
    console.log('functions: ', contract, contract.functions)
    const txHash = await contract.functions.scramble()
    .catch((err: any) => {
        console.error('Error in scramble: ', err);
    });

    console.log('scramble txHash: ', txHash);

    const result: string = await contract.getState();

    return result;
  }
);

export const doScrambleCube = async (dispatch: Dispatch, ethereum: any, account: string) => {
  console.log('doScrambleCube', ethereum);

  const web3 = new Web3(ethereum);
  const contract = new web3.eth.Contract(MevCube.abi as any, contractAddress)


  console.log('calling contract.scramble()');
  console.log('functions: ', contract, contract.methods)
  const txHash = await contract.methods.scramble().send({from: account});
  console.log('scramble txHash: ', txHash);
}
