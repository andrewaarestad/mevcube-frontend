import {ScrambleMove} from "../scramble-move";
import PendingMoves from "../pending-moves";
import * as React from "react";
import {useTypedSelector} from "../../../store/reducers";

export const CubeMoves = () => {

  const {pendingMoves, contractStateIsSolved} = useTypedSelector(state => state.cube);

  return (
    <>
      {pendingMoves.length > 0 ? (
        <PendingMoves />
      ) : contractStateIsSolved && (
        <ScrambleMove/>
      )}

    </>
  )
}
