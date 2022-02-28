import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import WalletProviderModal from '../WalletProviderModal'
import AccountModal from './AccountModal'
import useModal from "../../hooks/useModal";
import Button from "../Button";




interface AccountButtonProps {}



const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = useWallet()
  // console.log('account: ', account);
  const accountAddress = account ? `${account.slice(0, 6)}...${account.slice(account.length - 4)}` : '';

  // console.log('accountAddress: ', accountAddress);

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
      {!account ? (
        <Button onClick={handleUnlockClick} text="Connect" />
      ) : (
        <Button onClick={onPresentAccountModal}  text={accountAddress} />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  //border: 1px;
  //background: #333333;
`

export default AccountButton
