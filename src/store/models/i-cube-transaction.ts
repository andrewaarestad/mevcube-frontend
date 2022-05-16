import {ICubeSolution} from "./i-cube-solution";

export interface ICubeTransaction {
  blockHash: string,
  blockNumber: number,
  transactionHash: string,
  solution: ICubeSolution
}
