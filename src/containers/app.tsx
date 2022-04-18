import React, {useEffect, useState} from "react";
import AccountButton from "./wallet/AccountButton";

import {StyledAccountButtonWrapper} from './wallet/styled-account-button';
import {CubeProvider} from "../contexts/cube-provider";
import {useTypedSelector} from "../store/reducers";
import {UnconnectedCube} from "./cube/unconnected-cube";
import {CubeLoading} from "./cube/cube-loading";
import {NavMenu} from "../components/NavMenu/NavMenu";
import Cube from "./cube/cube";
import {CurrentScreen} from "../store/slices/nav";
import {About} from "./about/About";
import {Leaderboard} from "./leaderboard/Leaderboard";
import {useWallet} from "use-wallet";
import Environment from "../config/environment";

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

  const {currentContractState, flags} = useTypedSelector(state => state.cube);
  const {currentScreen} = useTypedSelector(state => state.nav);

  const {ethereum, chainId} = useWallet();

  const [chainIdMatches, setChainIdMatches] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);


  useEffect(() => {
    if (ethereum) {
      if (!walletConnected) {
        setWalletConnected(true);
      }
      console.log('chainId: ', chainId);
      if (chainId === Environment.ChainId) {
        console.log('chain ID matches');
        setChainIdMatches(true);
      } else {
        setChainIdMatches(false);
      }
    } else {
      if (walletConnected) {
        setWalletConnected(false);
      }
      console.log('chainId: not connected');
    }
  }, [chainId, ethereum])


  // console.log('App.render: ', currentContractState);
  return (
    <>

      <CubeProvider/>

      {!chainIdMatches && (
        <>
          <p>Chain ID Mismatch</p>
        </>
      )}

      {flags.isLoadingInitialCubeContractState ? (
        <CubeLoading/>
      ) : (
        <>

          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>

          {currentScreen === CurrentScreen.Home && (
            <>
              {currentContractState ? (
                <Cube/>
              ) : (
                <UnconnectedCube/>
              )}
            </>
          )}

          {currentScreen === CurrentScreen.About && (
            <>
              <About/>
            </>
          )}

          {currentScreen === CurrentScreen.Leaderboard && (
            <>
              <Leaderboard/>
            </>
          )}


        </>
      )}

      <NavMenu/>


    </>

  )
}
