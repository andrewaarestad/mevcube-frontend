import {Dispatch} from "@reduxjs/toolkit";
import {MevCube} from "../contracts/mev-cube";


export const sendSubmitSolution = async (pendingMoves: Array<string>, dispatch: Dispatch, ethereum: any, account: string | null) => {
  if (!account) {
    console.log('no account, cant submit solution');
    return;
  }
  console.log('sendSubmitSolution', ethereum, account);


  const contract = MevCube.getContract(ethereum);


  // console.log('calling contract.scramble()');
  // console.log('functions: ', contract, contract.methods)
  const txHash = await contract.methods.move(pendingMoves.join('')).send({from: account, value: MevCube.SOLVER_FEE});
  // const txHash = await contract.methods.move(pendingMoves.join('')).send({from: account});
  console.log('move txHash: ', txHash);
  return txHash;
}
