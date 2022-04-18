import {CubeLoading} from "./cube-loading";
import {CubeLoaded} from "./cube-loaded";
import React from "react";
import {useTypedSelector} from "../../store/reducers";

export const WalletConnectedCube = () => {

  const {flags} = useTypedSelector(state => state.cube);

  return (
    <>
      {flags.isLoadingInitialCubeContractState ? (
        <CubeLoading/>
      ) : (
        <CubeLoaded/>
      )}
    </>
  )
}
