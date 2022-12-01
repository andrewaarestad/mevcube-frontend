
interface IEnvironment {
  RPC: string,
  BlockExplorer: string,
  MevCubeContractAddress: string,
  ChainId: number,
  ChainName: string,
  ChainIdHex: () => string
}

// const hhEnvironment = {
//   RPC: 'http://localhost:8545',
//   BlockExplorer: 'http://localhost:4444',
//   MevCubeContractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
//   ChainId: 1337,
//   ChainName: 'Local Hardhat Network'
// };

const mumbaiEnvironment = {
  // RPC: 'wss://ws-mumbai.matic.today',
  RPC: 'https://rpc-mumbai.maticvigil.com/',
  // RPC: 'https://rpc-mumbai.maticvigil.com',
  BlockExplorer: 'https://mumbai.polygonscan.com',
  // MevCubeContractAddress: '0x6b2Ab1e64c96Bf052F448FCfABB08cB182738bf2'  // contract 1.1.0
  // MevCubeContractAddress: '0xa8127957F90498dAa4c15703Cc19D0d9a5ecD3D4',  // contract 1.2.0
  MevCubeContractAddress: '0x78e1D36ce509D42d694e94b1d9A8A9f9425d704C',  // contract 1.2.1
  ChainId: 80001,
  ChainName: 'Polygon Mumbai Testnet'
}

const getDevEnvironment = () => {
  // return hhEnvironment;
  return mumbaiEnvironment;
}

const getProductionEnvironment = () => {
  return mumbaiEnvironment;
}

const getEnvironment = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    return getProductionEnvironment();
  } else {
    return getDevEnvironment();
  }
}

const assembleEnvironment = (): IEnvironment => {
  const env = getEnvironment();
  return {
    ...env,
    ChainIdHex: () => {
      return '0x' + env.ChainId.toString(16)
    }
  }
}

export default assembleEnvironment();

