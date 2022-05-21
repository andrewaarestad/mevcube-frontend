import * as React from "react";
import {useTypedSelector} from "../../../store/reducers";
import {useWallet} from "use-wallet";
import "./CubeMoves.scss"
import Button from "../../../components/Button";
import {sendSubmitSolution} from "../../../thunks/submit-solution";
import {cubeSlice} from "../../../store/slices/cube";
import {MessagesService} from "../../../services/messages-service";
import {transactionsSlice} from "../../../store/slices/transactions";
import {pollCubeContract} from "../../../thunks/poll-cube-contract";
import {useAppDispatch} from "../../../store";
import {CubeUtils} from "../../../util/cube-utils";
import Spacer from "../../../components/Spacer";

export const CubeMoves = () => {

  const {pendingMoves, contractStateIsSolved} = useTypedSelector(state => state.cube);
  const dispatch = useAppDispatch();
  const {ethereum, account} = useWallet();

  const onClickScramble = () => {

  }

  const onClickReset = () => {
    dispatch(cubeSlice.actions.resetPendingMoves())
  }

  const onClickSubmitSolution = () => {
    sendSubmitSolution(pendingMoves, dispatch, ethereum, account)
    .then(txResult => {
      console.log('txResult: ', txResult);
      dispatch(cubeSlice.actions.resetPendingMoves());
      MessagesService.createMessage(dispatch, {
        title: 'Transaction Sent',
        body: 'Your moves have been submitted!',
        transactionHash: txResult.transactionHash
      })
      dispatch(transactionsSlice.actions.setIsAwaitingTxConfirmation({txHash: txResult.transactionHash, flag: true}))
      // dispatch(transactionsSlice.actions.setIsAwaitingTxConfirmation(false))
      dispatch(pollCubeContract())
    })
    .catch(err => {
      console.log('Error sending solution: ', err);
    })
  }

  return (
    <>
      {account ? (
        <div className={'cube-moves-wallet-connected'}>
          {pendingMoves.length > 0 ? (
            <div className='pending-moves-wrapper'>

              {pendingMoves.length > 0 && (
                <>
                  <p>Pending Moves: {CubeUtils.convertContractMovesToSingmaster(pendingMoves).join(' ')}</p>

                  <div className='cube-moves-button'>
                    <Button onClick={() => onClickReset()}>
                      Reset
                    </Button>
                  </div>

                  <Spacer size={"sm"}/>

                  {account ? (

                    <div className='pending-moves-buttons-wrapper'>

                      <div className='cube-moves-button'>
                        <Button onClick={() => onClickSubmitSolution()}>
                          Submit Moves
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>Connect wallet to submit your moves</p>
                    </div>
                  )}


                </>
              )}
            </div>

          ) : contractStateIsSolved && (
            <div>
              <p className='cube-moves-title'>The cube is currently solved. You can scramble it: </p>
              <div className={'cube-moves-button cube-moves-scramble'}>
                <Button onClick={() => onClickScramble()}>
                  Scramble
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={'cube-moves-connect-wallet'}>
          <p className={'vertical-center'}>Connect wallet to interact with cube</p>
        </div>
      )}


    </>
  )
}
