import {useWallet} from "use-wallet";
import React, {useEffect, useState} from "react";
import Environment from "../../config/environment";
import {CubeProvider} from "../../contexts/cube-provider";
import {CubeLoader} from "../app/cube-loader/cube-loader";
import {ChainMismatch} from "../app/chain-mismatch/ChainMismatch";
import {CubeMoves} from "../cube/moves/cube-moves";
import {LeftNav} from "../left-nav/LeftNav";

export const Home = () => {

  const {ethereum, chainId} = useWallet();

  const [chainIdMatches, setChainIdMatches] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (ethereum) {
      if (!walletConnected) {
        setWalletConnected(true);
      }
    } else {
      if (walletConnected) {
        setWalletConnected(false);
      }
      console.log('chainId: not connected');
    }
  }, [ethereum, walletConnected])


  useEffect(() => {
    console.log('chainId: ', chainId);
    if (ethereum) {
      // console.log('chainId: ', chainId);
      if (chainId === Environment.ChainId) {
        // console.log('chain ID matches');
        setChainIdMatches(true);
      } else {
        setChainIdMatches(false);

        // TODO: This does show a prompt to change chains, but it doesn't actually change the chain...?
        // try {
        //   attemptChainSwitch();
        // } catch (err) {
        //   console.error('error changing chains: ', err);
        // }
      }
    }
  }, [chainId, ethereum])


  // console.log('App.render: ', currentContractState);
  return (
    <>

      <CubeProvider/>

      <div className={'app-title'}>
        <p>mevcube</p>
        &nbsp;
        <p>testnet</p>
      </div>

      <div className={'app-cube-area'}>
        {chainIdMatches ? (
          <CubeLoader/>
        ) : (
          <ChainMismatch chainId={chainId}/>
        )}
      </div>


      <div className={'app-moves-area'}>

        <CubeMoves/>
      </div>


      {/*<div className={'app-recent-tx-area'}>*/}

      {/*  <MostRecentTx/>*/}
      {/*</div>*/}





      {/*<MessageCenter/>*/}



    </>

  )
}
