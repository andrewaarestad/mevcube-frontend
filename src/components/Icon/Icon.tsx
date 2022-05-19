import React from "react";

export const Icon = (props: {type: string}) => {

  return (
    <i className={`fa-solid fa-${props.type}`}></i>
  )
}
