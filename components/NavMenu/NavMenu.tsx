import Button from "../Button";
import React, {useState} from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import {useTypedSelector} from "../../store/reducers";
import {CurrentScreen, navSlice} from "../../store/slices/nav";
import {useAppDispatch} from "../../store";

export const NavMenu: React.FC = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const {currentScreen} = useTypedSelector(state => state.nav);

  // const [onPresentLogoModal] = useModal(<LogoModal />)


  // const showHelpModal = () => {
  //
  // }

  const didClickHome = () => {
    setIsExpanded(false)
    if (currentScreen !== CurrentScreen.Home) {
      dispatch(navSlice.actions.setCurrentScreen(CurrentScreen.Home));
    }
  }

  const didClickAbout = () => {
    setIsExpanded(false)
    if (currentScreen !== CurrentScreen.About) {
      dispatch(navSlice.actions.setCurrentScreen(CurrentScreen.About));
    }
  }

  const didClickCollapse = () => {
    setIsExpanded(false)
  }

  const didClickExpand = () => {
    setIsExpanded(true)
  }

  return <StyledNavButtons>
    {
      isExpanded ? (
        <div>
          <StyledNavItem>
            <Button onClick={() => didClickHome()}> Home </Button>
          </StyledNavItem>
          <StyledNavItem>
            <Spacer size="sm"/>
          </StyledNavItem>
          <StyledNavItem>
            <Button onClick={() => didClickAbout()}> About </Button>
          </StyledNavItem>
          <StyledNavItem>
            <Spacer size="sm"/>
          </StyledNavItem>
          <StyledNavItem>
            <Button onClick={() => didClickCollapse()}> {'>'} </Button>
          </StyledNavItem>

          {/*<p>mevcube</p>*/}
        </div>
      ) : (
        <div>
          <Button onClick={() => didClickExpand()}>
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
