import "./LeftNav.scss"
import {Icon} from "../../components/Icon/Icon";
import React from "react";

export const LeftNavItem = (props: {icon: string, title: string, onClick: () => void}) => {

  return (
    <div className="nav-item" onClick={() => props.onClick()}>
      <div className={'nav-item-text'}>
        <Icon type={props.icon}/>
        <p>{props.title}</p>
      </div>
    </div>
  )
}
