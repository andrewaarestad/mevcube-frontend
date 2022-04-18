import {CurrentScreen} from "../../store/slices/nav";
import Cube from "../cube/cube";
import {UnconnectedCube} from "../cube/unconnected-cube";
import {About} from "../about/About";
import {Leaderboard} from "../leaderboard/Leaderboard";
import React from "react";
import {useTypedSelector} from "../../store/reducers";


export const CubeLoaded = () => {

  const {currentScreen} = useTypedSelector(state => state.nav);
  const {currentContractState} = useTypedSelector(state => state.cube);

  return (
    <>


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
  )
}
