import React, {useEffect, useState} from "react";

import {CubeProvider} from "../../contexts/cube-provider";
import {useWallet} from "use-wallet";
import Environment from "../../config/environment";
import {CubeLoader} from "./cube-loader/cube-loader";
import styled from "styled-components";
import {MessageCenter} from "../messages/MessageCenter";
import {MostRecentTx} from "./most-recent-tx";
import {LeftNav} from "../left-nav/LeftNav";
import "./App.scss"
import {ChainMismatch} from "./chain-mismatch/ChainMismatch";
import {CubeMoves} from "../cube/moves/cube-moves";


export function App() {


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


      <div className={'app-recent-tx-area'}>

        <MostRecentTx/>
      </div>



      <LeftNav/>


      <MessageCenter/>



    </>

  )
}




