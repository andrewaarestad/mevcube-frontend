import Button from "../../components/Button";
import * as React from "react";
import {useWallet} from "use-wallet";

export const ScrambleMove = () => {

  const {account} = useWallet();

  const onClickScramble = () => {

  }

  return (
    <>
      {account ? (
        <Button onClick={() => onClickScramble()}>
          Scramble
        </Button>
      ) : (
        <p>Connect account to interact with the cube</p>
      )}
    </>
  )
}
