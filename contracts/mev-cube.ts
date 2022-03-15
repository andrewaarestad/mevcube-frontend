
import MevCubeAbi from './abis/MevCube.json'
import Web3 from "web3";
import {Addresses} from "../config/addresses";

export class MevCube {
  public static ADDRESS = Addresses.MevCube
  public static ABI = MevCubeAbi.abi

  public static getContract(ethereum: any) {
    const web3 = new Web3(ethereum);
    // console.log('web3: ', web3);
    const contract = new web3.eth.Contract(MevCubeAbi.abi as any, MevCube.ADDRESS)
    return contract;

  }
}
