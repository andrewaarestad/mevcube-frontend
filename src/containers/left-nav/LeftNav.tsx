import Button from "../../components/Button";
import React, {useState} from "react";
import AccountButton from "../wallet/AccountButton";
import "./LeftNav.scss"
import {LeftNavItem} from "./LeftNavItem";
import {useAppDispatch} from "../../store";
import {CurrentScreen, navSlice} from "../../store/slices/nav";
import {H2} from "../../components/H2/H2";
import {Icon} from "../../components/Icon/Icon";

export const LeftNav = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const didClickCollapse = () => {
    setIsExpanded(false)
  }

  const didClickExpand = () => {
    setIsExpanded(true)
  }

  const onClickNavLink = (screen: CurrentScreen) => {
    setIsExpanded(false)
    dispatch(navSlice.actions.setCurrentScreen(screen));
  }

  return isExpanded ? (
    <div className={'left-nav-container'}>
      <div className={'left-nav-menu'}>
        <H2 text={'mevcube'}/>


        <div className={'left-nav-account-button-wrapper'} onClick={() => didClickCollapse()}>
          <AccountButton />
        </div>

        <LeftNavItem icon={'cube'} title={'Home'} onClick={() => onClickNavLink(CurrentScreen.Home)}/>
        <LeftNavItem icon={'medal'} title={'Leaderboard'} onClick={() => onClickNavLink(CurrentScreen.Leaderboard)}/>
        <LeftNavItem icon={'question'} title={'About'} onClick={() => onClickNavLink(CurrentScreen.About)}/>


      </div>
      <div className={'left-nav-background'} onClick={() => didClickCollapse()}/>

    </div>

  ) : (
    <div className={'left-nav-hamburger-button'}>
      <Button size={'md'} onClick={() => didClickExpand()}>
        <Icon type={'bars'} size={'lg'}/>
        {/*<img src={"/hamburger_icon_64.png"} style={{ height: 25 }} alt={"menu"}/>*/}
      </Button>
      {/*<p>mevcube</p>*/}
    </div>
  )
}




