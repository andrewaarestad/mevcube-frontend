
interface IEnvironment {
  RPC: string,
  MevCube: string,
  ChainId: number,
  ChainName: string
}

const hhEnvironment = {
  RPC: 'http://localhost:8545',
  MevCube: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
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

const getEnvironment = (): IEnvironment => {
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    return getProductionEnvironment();
  } else {
    return getDevEnvironment();
  }
}

export default getEnvironment();

