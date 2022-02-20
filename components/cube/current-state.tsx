import {useTypedSelector} from "../../store/reducers";
import * as React from "react";

export function CurrentState() {
  const {currentScreenState} = useTypedSelector(state => state.cube);

  // console.log('CurrentState.render: ', currentScreenState);

  return (

    <div id="current">
      <p>Current State: {currentScreenState}</p>
    </div>
  )
}
