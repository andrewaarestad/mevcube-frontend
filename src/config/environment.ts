
interface IEnvironment {
  RPC: string,
  MevCube: string,
  ChainId: number,
  ChainName: string,
  ChainIdHex: () => string
}

const hhEnvironment = {
  RPC: 'http://localhost:8545',
  MevCube: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  ChainId: 1337,
  ChainName: 'Local Hardhat Network'
};

const mumbaiEnvironment = {
  RPC: 'https://rpc-mumbai.maticvigil.com',
  // MevCube: '0x6b2Ab1e64c96Bf052F448FCfABB08cB182738bf2'  // contract 1.1.0
  MevCube: '0xa8127957F90498dAa4c15703Cc19D0d9a5ecD3D4',  // contract 1.2.0
  ChainId: 80001,
  ChainName: 'Polygon Mumbai Testnet'
}

const getDevEnvironment = () => {
  return hhEnvironment;
  // return mumbaiEnvironment;
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
