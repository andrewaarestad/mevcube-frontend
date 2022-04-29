import React, {useEffect, useState} from "react";
import AccountButton from "../wallet/AccountButton";

import {StyledAccountButtonWrapper} from '../wallet/styled-account-button';
import {CubeProvider} from "../../contexts/cube-provider";
import {NavMenu} from "../../components/NavMenu/NavMenu";
import {useWallet} from "use-wallet";
import Environment from "../../config/environment";
import {WalletConnectedCube} from "./wallet-connected-cube";
import styled from "styled-components";
import {MessageCenter} from "../messages/MessageCenter";
import {MostRecentTx} from "./most-recent-tx";

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
//
// const firebaseConfig = {
//   apiKey: "AIzaSyCggyQhFbn4HmsbpTAsZ3Jk1mZxGctk7Ak",
//   authDomain: "mevcube.firebaseapp.com",
//   projectId: "mevcube",
//   storageBucket: "mevcube.appspot.com",
//   messagingSenderId: "280823653252",
//   appId: "1:280823653252:web:94f3508fb673a4c22273d1",
//   measurementId: "G-36PDW439PB"
// };


export function App() {


// Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

  // const dispatch = useAppDispatch();


  const {ethereum, chainId} = useWallet();

  const [chainIdMatches, setChainIdMatches] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);


  // const {isAwaitingTxConfirmation} = useTypedSelector(state => state.transactions);

  // const attemptChainSwitch = async() => {
  //   console.log('attemptChainSwitch()');
  //   const switchResult = await ethereum.request({
  //     method: 'wallet_switchEthereumChain',
  //     params: [{ chainId: Environment.ChainIdHex() }], // chainId must be in hexadecimal numbers
  //   });
  //   console.log('switchResult: ', switchResult);
  // }

  // useEffect(() => {
  //   dispatch(messagesSlice.actions.addMessage({title: 'Test Message', body: 'This is a test message, look here for important info soon!'}));
  // }, [dispatch]);

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

      <StyledTitle>
        mevcube
      </StyledTitle>

      {chainIdMatches ? (
        <WalletConnectedCube/>
      ) : (

        <StyledChainIdMismatch>
        <StyledText>

          <StyledChainIdMismatch>
            <h2>Chain ID Mismatch</h2>
          </StyledChainIdMismatch>
          <br/>
          <p>Hey there, looks like you connected your wallet, but it's not on the chain we use for mevcube.</p>
          <br/>
          <p>You are connected to chainId: <b>{chainId}</b></p>
          <br/>
          <p>However, mevcube runs on chainId: <b>{Environment.ChainId}</b> ({Environment.ChainName})</p>
          <br/>
          <p>Switch to {Environment.ChainName} to get started!</p>
        </StyledText>
        </StyledChainIdMismatch>
      )}


      <StyledAccountButtonWrapper>
        <AccountButton />
      </StyledAccountButtonWrapper>

      <StyledMostRecentTxWrapper>
        <MostRecentTx/>
      </StyledMostRecentTxWrapper>

      <NavMenu/>

      <MessageCenter/>

      {/*{isAwaitingTxConfirmation && (*/}
      {/*  <PendingTx/>*/}
      {/*)}*/}

    </>

  )
}

const StyledMostRecentTxWrapper = styled.div`

  position: fixed;
  left: 40px;
  top: 120px;
`

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  //padding-bottom: -2rem;
  font-size: 16px;
  //background: green;
`

const StyledChainIdMismatch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-size: 12px;
  //background: green;
`
const StyledText = styled.div`
  font-size: 14px;
  width: 40%;
  //background: blue  ;
  column-count: 1 ;
  column-rule-width: 5px;
  column-rule-style: dotted;
  column-rule-color: rebeccapurple;
`
