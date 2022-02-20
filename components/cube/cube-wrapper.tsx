import React from "react";
import Cube from "./cube";

// interface ICubeState {
//   pendingMoves: Array<string>
// }

// const cubeState: ICubeState = {
//   pendingMoves: []
// }

// const CubeContext = React.createContext(cubeState);

export function CubeWrapper() {

  return (
    // <CubeContext.Provider value={cubeState}>
      <Cube/>
    // </CubeContext.Provider>
  )
}
