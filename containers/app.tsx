import {CubeWrapper} from "../components/cube/cube-wrapper";
import React from "react";
import dynamic from "next/dynamic";
import AccountButton from "../components/wallet/AccountButton";

import {StyledAccountButtonWrapper} from '../components/wallet/styled-account-button';
import {CubeProvider} from "../contexts/cube-provider";
import {useTypedSelector} from "../store/reducers";
import {UnconnectedCube} from "../components/cube/unconnected-cube";
import {CubeLoading} from "../components/cube/cube-loading";
import {Logo} from "../components/Logo/Logo";

// const PriorityExample = dynamic(() => import('../components/connectors/PriorityExample'), { ssr: false })

// const MetaMaskCard = dynamic(() => import('../components/connectors/MetaMaskCard'), { ssr: false })
// const WalletConnectCard = dynamic(() => import('../components/connectors/WalletConnectCard'), { ssr: false })
// const WalletLinkCard = dynamic(() => import('../components/connectors/WalletLinkCard'), { ssr: false })
// const NetworkCard = dynamic(() => import('../components/connectors/NetworkCard'), { ssr: false })

export function App() {

  const {currentContractState, flags} = useTypedSelector(state => state.cube);

  // console.log('App.render: ', currentContractState);
  return (
    <>

      <CubeProvider/>

      {flags.isLoadingInitialCubeContractState ? (
        <CubeLoading/>
      ) : (
        <>

          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>

          {currentContractState ? (
            <CubeWrapper/>
          ) : (
            <UnconnectedCube/>
          )}
        </>
      )}

      <Logo/>


    </>

  )
}
