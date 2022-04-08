import {Dispatch} from "@reduxjs/toolkit";
import {MevCube} from "../contracts/mev-cube";

export const sendResetCube = async (dispatch: Dispatch, ethereum: any, account: string | null) => {
  if (!account) {
    console.log('no account cant reset cube');
    return;
  }
  console.log('doResetCube', ethereum);

  const contract = MevCube.getContract(ethereum);

  const txHash = await contract.methods.reset().send({from: account});
  console.log('reset txHash: ', txHash);

}
