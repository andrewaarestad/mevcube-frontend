import {ScrambleMove} from "../scramble-move";
import PendingMoves from "../pending-moves";
import * as React from "react";
import {useTypedSelector} from "../../../store/reducers";
import styled from "styled-components";

export const CubeMoves = () => {

  const {pendingMoves, contractStateIsSolved} = useTypedSelector(state => state.cube);

  return (
    <>
      {pendingMoves.length > 0 ? (
        <PendingMoves />
      ) : contractStateIsSolved && (
        <StyledContent>
          <ScrambleMove/>
        </StyledContent>
      )}

    </>
  )
}

const StyledContent = styled.div`
  //background: blue;
  right: 0;
`
