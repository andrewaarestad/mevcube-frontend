import styled from "styled-components";
import Button from "../../components/Button";
import React, {useState} from "react";
import {StyledAccountButtonWrapper} from "../wallet/styled-account-button";
import AccountButton from "../wallet/AccountButton";
import {Icon} from "../../components/Icon/Icon";
import Spacer from "../../components/Spacer";
import "./LeftNav.scss"
import {LeftNavItem} from "./LeftNavItem";
import {useAppDispatch} from "../../store";
import {CurrentScreen, navSlice} from "../../store/slices/nav";

export const LeftNav = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const didClickCollapse = () => {
    setIsExpanded(false)
  }

  const didClickExpand = () => {
    console.log('didClickExpand');
    setIsExpanded(true)
  }

  const onClickNavLink = (screen: CurrentScreen) => {
    setIsExpanded(false)
    dispatch(navSlice.actions.setCurrentScreen(screen));
  }

  return isExpanded ? (
    <StyledLeftNavContainer>
      <StyledLeftNav>
        <StyledNavTitle>mevcube</StyledNavTitle>


        <StyledNavItem onClick={() => didClickCollapse()}>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
        </StyledNavItem>

        <LeftNavItem icon={'cube'} title={'Home'} onClick={() => onClickNavLink(CurrentScreen.Home)}/>
        <LeftNavItem icon={'medal'} title={'Leaderboard'} onClick={() => onClickNavLink(CurrentScreen.Leaderboard)}/>
        <LeftNavItem icon={'question'} title={'About'} onClick={() => onClickNavLink(CurrentScreen.About)}/>

        {/*<div className="nav-item">*/}
        {/*  <Icon type={'medal'}/>*/}
        {/*  <p>Leaderboard</p>*/}
        {/*</div>*/}

        {/*<div className="nav-item">*/}
        {/*  <Icon type={'circle-info'}/>*/}
        {/*  <p>About</p>*/}
        {/*</div>*/}

      </StyledLeftNav>
      <StyledLeftNavBackground onClick={() => didClickCollapse()}/>

    </StyledLeftNavContainer>

  ) : (
    <StyledButtonWrapper>
      <Button onClick={() => didClickExpand()}>
        <img src={"/hamburger_icon_64.png"} style={{ height: 25 }} alt={"menu"}/>
      </Button>
      {/*<p>mevcube</p>*/}
    </StyledButtonWrapper>
  )
}

const StyledNavTitle = styled.div`
  padding: 20px;
`

const StyledNavItem = styled.div`
  padding: 20px;
`

const StyledButtonWrapper = styled.div`

  position: fixed;
  left: 30px;
  top: 30px;
  //z-index: 10;
`

const StyledLeftNavContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  //z-index: 10;
`

const StyledLeftNav = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  width: 75%;
  //background: greenyellow;
  background: #999999;
`

const StyledLeftNavBackground = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  width: 25%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.2);
`
