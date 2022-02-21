import {Dispatch} from "@reduxjs/toolkit";
import {MevCube} from "../contracts/mev-cube";


export const sendSubmitSolution = async (dispatch: Dispatch, ethereum: any, account: string) => {
  console.log('sendSubmitSolution', ethereum);


  const contract = MevCube.getContract(ethereum);


  // console.log('calling contract.scramble()');
  // console.log('functions: ', contract, contract.methods)
  const txHash = await contract.methods.scramble().send({from: account});
  // console.log('scramble txHash: ', txHash);
}
