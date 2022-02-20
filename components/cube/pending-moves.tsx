import * as React from "react";
import {RubikCube} from "./models/rubik-cube";
import {useTypedSelector} from "../../store/reducers";

interface IPendingMovesProps {

}

export default function PendingMoves() {

  const {pendingMoves} = useTypedSelector(state => state.cube);

  console.log('PendingMoves.render: ', pendingMoves);

  return (

    <div id="pending">
      <p>Pending Moves: {pendingMoves.join(' ')}</p>
    </div>
  )
}
