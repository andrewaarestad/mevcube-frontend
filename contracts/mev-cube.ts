
import MevCubeAbi from './abis/MevCube.json'
import Web3 from "web3";

export class MevCube {
  public static ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  public static ABI = MevCubeAbi.abi

  public static getContract(ethereum: any) {
    const web3 = new Web3(ethereum);
    console.log('web3: ', web3);
    const contract = new web3.eth.Contract(MevCubeAbi.abi as any, MevCube.ADDRESS)
    return contract;

  }
}
