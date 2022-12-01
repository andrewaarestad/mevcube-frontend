import React from "react";

import "./App.scss"
import {useTypedSelector} from "../../store/reducers";
import {CurrentScreen} from "../../store/slices/nav";
import {About} from "../about/About";
import {Leaderboard} from "../leaderboard/Leaderboard";
import {Home} from "../home/Home";
import {LeftNav} from "../left-nav/LeftNav";


export function App() {

  // const dispatch = useAppDispatch();

  const {currentScreen} = useTypedSelector(state => state.nav);

  // if (currentScreen === CurrentScreen.Home) {
  //   MessagesService.createMessage(dispatch, {
  //     title: 'Scramble the cube!',
  //     body: 'The cube is currently solved.  Why don\'t you try scrambling it?'
  //   });
  // }


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




