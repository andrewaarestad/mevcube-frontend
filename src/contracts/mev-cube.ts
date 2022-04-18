
import MevCubeAbi from './abis/MevCube.json'
import Web3 from "web3";
import Environment from "../config/environment";
import {ethers} from "ethers";

export class MevCube {
  public static ADDRESS = Environment.MevCube
  public static ABI = MevCubeAbi.abi
  public static SOLVER_FEE = ethers.utils.parseEther("0.01")

  public static getContract(ethereum: any) {
    const web3 = new Web3(ethereum);
    // console.log('web3: ', web3);
    const contract = new web3.eth.Contract(MevCubeAbi.abi as any, MevCube.ADDRESS)
    return contract;

  }
}
