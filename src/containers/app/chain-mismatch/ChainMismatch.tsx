import Environment from "../../../config/environment";
import React from "react";
import styled from "styled-components";

export const ChainMismatch = (props: {chainId?: number}) => {
  return (
    <StyledChainIdMismatch>
      <StyledText>

        <StyledChainIdMismatch>
          <h2>Chain ID Mismatch</h2>
        </StyledChainIdMismatch>
        <br/>
        <p>Hey there, looks like you connected your wallet, but it's not on the chain we use for mevcube.</p>
        <br/>
        <p>You are connected to chainId: <b>{props.chainId}</b></p>
        <br/>
        <p>However, mevcube runs on chainId: <b>{Environment.ChainId}</b> ({Environment.ChainName})</p>
        <br/>
        <p>Switch to {Environment.ChainName} to get started!</p>
      </StyledText>
    </StyledChainIdMismatch>
  )
}

const StyledChainIdMismatch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-size: 12px;
  //background: green;
`
const StyledText = styled.div`
  font-size: 14px;
  width: 40%;
  //background: blue  ;
  column-count: 1 ;
  column-rule-width: 5px;
  column-rule-style: dotted;
  column-rule-color: rebeccapurple;
`
