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

const LogoModal: React.FC<ModalProps> = ({ onDismiss }) => {


  return (
    <Modal>
      <ModalTitle text="mevcube" />
      <Label text="Welcome to mevcube." />

    </Modal>
  )
}


export default LogoModal
