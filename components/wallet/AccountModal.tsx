import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import ModalTitle from "../ModalTitle";
import ModalContent from "../ModalContent";
import Spacer from "../Spacer";
import Modal, {ModalProps} from "../Modal";
import ModalActions from "../ModalActions";
import Button from "../Button";
import Value from "../Value";
import CardIcon from "../CardIcon";
import Label from "../Label";
import {sendScrambleCube} from "../../thunks/scramble-cube";
import {pollCubeContract} from "../../thunks/poll-cube-contract";
import {sendResetCube} from "../../thunks/reset-cube";
import {useAppDispatch} from "../../store";

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, ethereum, reset } = useWallet()
  const dispatch = useAppDispatch();

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  // const sushi = useSushi()
  // const sushiBalance = useTokenBalance(getSushiAddress(sushi))

  const onClickScramble = () => {
    onDismiss!()
    sendScrambleCube(dispatch, ethereum, account)
    .then(() => dispatch(pollCubeContract()))
    .catch(err => {
      console.error('Error scrambling cube: ', err);
    })
  }

  const onClickReset = () => {
    onDismiss!()
    sendResetCube(dispatch, ethereum, account)
    .then(() => dispatch(pollCubeContract()))
    .catch(err => {
      console.error('Error resetting cube: ', err);
    })
  }

  return (
    <Modal>
      <ModalTitle text="mevcube" />
      <ModalContent>
        <Label text={"Connected with Account: " + account} />
        <Spacer />
        <Button
          onClick={onClickScramble}
          text="Scramble Cube"
          variant="secondary"
        />
        <Spacer size={"sm"} />
        <Button
          onClick={onClickReset}
          text="Cheat (Solve Cube)"
          variant="secondary"
        />
        <Spacer size={"sm"} />
        <Button
          onClick={handleSignOutClick}
          text="Sign out"
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
