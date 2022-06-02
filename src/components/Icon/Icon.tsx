import React from "react";

export const Icon = (props: {type: string, size?: '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl'}) => {

  return (
    <i className={`fa-solid fa-${props.type} ${props.size ? 'fa-' + props.size : ''}`}></i>
  )
}
