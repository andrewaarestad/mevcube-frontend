import {useWallet} from "use-wallet";
import {ethers} from "ethers";

import * as cubeAbi from '../abis/MevCube.json'
import {useEffect} from "react";

export const CubeProvider = (): null => {

  console.log('CubeProvider.render');

  const wallet = useWallet()

  const contractAddress = '0x0E801D84Fa97b50751Dbf25036d067dCf18858bF';

  console.log('ethereum: ', wallet.ethereum);
  console.log('wallet: ', wallet);



  const pollCubeContract = async() => {
    if (wallet.ethereum) {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(contractAddress, cubeAbi.abi, provider.getSigner());
      const result = await contract.getState();
      console.log('contract state: ', result);
    } else {
      console.log('not connected');
    }
  }

  useEffect(() => {
    const pollInterval = setInterval(() => {
      pollCubeContract()
      .catch(err => {
        console.error('Error polling cube contract: ', err);
      })
    }, 10000);

    return () => {
      clearInterval(pollInterval);
    }
  })

  return null;
}
