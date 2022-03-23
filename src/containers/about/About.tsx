import styled from "styled-components";
import {useTypedSelector} from "../../store/reducers";
import React from "react";
import Spacer from "../../components/Spacer";
const Tooltip = require("react-simple-tooltip");


export const About = () => {

  // console.log('About.render');

  const {contractVersion} = useTypedSelector(state => state.cube);

  return (
    <StyledAbout>
      <StyledText>
        <StyledAbout>
          <h1>mevcube {contractVersion}</h1>
        </StyledAbout>
        <br/>
        <p>The object is simple: solve the cube if it needs solving.
          Or, scramble it if it's already solved!</p>

        <p>mevcube is a single instance of a puzzle cube which can be solved by anyone.
          The state of the puzzle is stored on-chain and visualized on this site.
          Players may perform moves on the cube contract to solve it.
          A successful solution will get you on the leaderboard.
          Use this website to explore the cube and prepare your solution, but if you really want to compete you may want to build a bot. </p>

        <p>As an incentive to keep the game moving, players must submit a fee when solving the puzzle.
          This fee is used to create a bounty that searchers can claim to scramble the puzzle for the next player.</p>

        <Spacer/>

        <StyledLinkIcons>

          <Tooltip content="https://github.com/andrewaarestad/mevcube-frontend">
            <Link href={"https://github.com/andrewaarestad/mevcube-frontend"} target="_blank" rel="noopener noreferrer">
              <Icon>
                <img src={'/github.png'} style={{ height: 32 }}  alt="github"/>
              </Icon>
            </Link>
          </Tooltip>

          <Spacer/>

          <Tooltip content="https://twitter.com/mevcube">
            <Link href={"https://twitter.com/mevcube"} target="_blank" rel="noopener noreferrer">
              <Icon>
                <img src={'/twitter.png'} style={{ height: 32 }}  alt="twitter"/>
              </Icon>
            </Link>
          </Tooltip>

          <Spacer/>

          <Tooltip content="https://mumbai.polygonscan.com/address/0x6b2Ab1e64c96Bf052F448FCfABB08cB182738bf2">
            <Link href={"https://mumbai.polygonscan.com/address/0x6b2Ab1e64c96Bf052F448FCfABB08cB182738bf2"} target="_blank" rel="noopener noreferrer">
              <Icon>
                <img src={'/polygon.png'} style={{ height: 32 }}  alt="polygonscan"/>
              </Icon>
            </Link>
          </Tooltip>
        </StyledLinkIcons>

      </StyledText>
    </StyledAbout>
  )
}

const StyledLinkIcons = styled.div`
  display:flex;
  //align-items: center;
  //background: green;
  justify-content: center;
  //position: fixed;
  //right: 35px;
  //top: 30px;
`

const Link = styled.a`
  //display: flex;
  //align-items: center;
  //padding: 5px 10px;
  //background: papayawhip;
  //color: palevioletred;
  display: inline-block;
`;

const Icon = styled.div`
  //flex: none;
  //transition: fill 0.25s;
  //width: 48px;
  //height: 48px;

  ${Link}:hover & {
    opacity: 0.5;
    //fill: rebeccapurple;
  }
`;

const StyledAbout = styled.div`
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
