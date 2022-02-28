import Button from "../Button";
import useModal from "../../hooks/useModal";
import React, {useState} from "react";
import LogoModal from "./LogoModal";
import styled from "styled-components";
import Spacer from "../Spacer";

export const Logo: React.FC = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  // const [onPresentLogoModal] = useModal(<LogoModal />)


  // const showHelpModal = () => {
  //
  // }

  return <StyledNavButtons>
    {
      isExpanded ? (
        <div>
          <StyledNavItem>
            <Button onClick={() => setIsExpanded(false)}> Home </Button>
          </StyledNavItem>
          <StyledNavItem>
            <Spacer size="sm"/>
          </StyledNavItem>
          <StyledNavItem>
            <Button onClick={() => setIsExpanded(false)}> About </Button>
          </StyledNavItem>
          <StyledNavItem>
            <Spacer size="sm"/>
          </StyledNavItem>
          <StyledNavItem>
            <Button onClick={() => setIsExpanded(false)}> {'>'} </Button>
          </StyledNavItem>

          {/*<p>mevcube</p>*/}
        </div>
      ) : (
        <div>
          <Button onClick={() => setIsExpanded(true)}>
            <img src={"/hamburger_icon_64.png"} style={{ height: 25 }} alt={"menu"}/>
          </Button>
          {/*<p>mevcube</p>*/}
        </div>
      )
    }
  </StyledNavButtons>


}

const StyledNavItem = styled.div`
  //display: flex;
  display: inline-block;

   //flex-direction: row;
`

const StyledNavButtons = styled.div`
  //display: flex;
  position: fixed;
  right: 35px;
  top: 30px;
  //background: aquamarine;
  //width: 100%;
  // flex-direction: row;
  //
  // @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
  //   flex-direction: row;
  //   flex-wrap: none;
  // }
`
