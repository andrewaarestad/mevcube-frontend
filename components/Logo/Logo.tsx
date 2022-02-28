// @ts-ignore
import styles from './Logo.module.scss';
import Button from "../Button";
import useModal from "../../hooks/useModal";
import React from "react";
import LogoModal from "./LogoModal";

export const Logo: React.FC = () => {

  const [onPresentLogoModal] = useModal(<LogoModal />)


  // const showHelpModal = () => {
  //
  // }

  return (
    <div className={styles.logo}>
      <Button onClick={onPresentLogoModal}>mevcube</Button>
      {/*<p>mevcube</p>*/}
    </div>
  )
}
