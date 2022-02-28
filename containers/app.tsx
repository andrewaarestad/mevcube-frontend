import React from "react";
import AccountButton from "./wallet/AccountButton";

import {StyledAccountButtonWrapper} from './wallet/styled-account-button';
import {CubeProvider} from "../contexts/cube-provider";
import {useTypedSelector} from "../store/reducers";
import {UnconnectedCube} from "./cube/unconnected-cube";
import {CubeLoading} from "./cube/cube-loading";
import {Logo} from "../components/Logo/Logo";
import Cube from "./cube/cube";


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
            <Cube/>
          ) : (
            <UnconnectedCube/>
          )}
        </>
      )}

      <Logo/>


    </>

  )
}
