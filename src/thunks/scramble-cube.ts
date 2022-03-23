import {Dispatch} from "@reduxjs/toolkit";
import {MevCube} from "../contracts/mev-cube";


// interface IScrambleCubeProps {
//   ethereum: any
// }

// export const scrambleCube = createAsyncThunk(
//   'cube/scrambleCube',
//   async ({ethereum}: IScrambleCubeProps, {dispatch, getState}) => {
//
//       // const {ethereum} = useWallet();
//       console.log('ethereum: ', ethereum);
//
//     // const provider = new ethers.providers.JsonRpcProvider();
//     // const contract = new ethers.Contract(contractAddress, MevCube.abi, ethereum);
//     const contract = new ethereum.eth.Contract(MevCube.abi, contractAddress)
//
//     console.log('calling contract.scramble()');
//     console.log('functions: ', contract, contract.functions)
//     const txHash = await contract.functions.scramble()
//     .catch((err: any) => {
//         console.error('Error in scramble: ', err);
//     });
//
//     console.log('scramble txHash: ', txHash);
//
//     const result: string = await contract.getState();
//
//     return result;
//   }
// );

export const sendScrambleCube = async (dispatch: Dispatch, ethereum: any, account: string | null) => {
  if (!account) {
    console.log('no account, cant scramble cube');
    return;
  }
  console.log('sendScrambleCube', ethereum);


  const contract = MevCube.getContract(ethereum);


  // console.log('calling contract.scramble()');
  // console.log('functions: ', contract, contract.methods)
  await contract.methods.scramble().send({from: account});
  // console.log('scramble txHash: ', txHash);
}
