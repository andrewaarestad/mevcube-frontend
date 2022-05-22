import React, {useEffect, useState} from "react";

import "./App.scss"
import {useTypedSelector} from "../../store/reducers";
import {CurrentScreen} from "../../store/slices/nav";
import {About} from "../about/About";
import {Leaderboard} from "../leaderboard/Leaderboard";
import {Home} from "../home/Home";
import {LeftNav} from "../left-nav/LeftNav";


export function App() {


  const {currentScreen} = useTypedSelector(state => state.nav);


  return (
    <>

      <LeftNav/>

      {currentScreen === CurrentScreen.Home && (
        <>
          <Home/>
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




