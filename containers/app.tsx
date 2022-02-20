import {CubeWrapper} from "../components/cube/cube-wrapper";
import React from "react";
import dynamic from "next/dynamic";


const PriorityExample = dynamic(() => import('../components/connectors/PriorityExample'), { ssr: false })

// const MetaMaskCard = dynamic(() => import('../components/connectors/MetaMaskCard'), { ssr: false })
// const WalletConnectCard = dynamic(() => import('../components/connectors/WalletConnectCard'), { ssr: false })
// const WalletLinkCard = dynamic(() => import('../components/connectors/WalletLinkCard'), { ssr: false })
// const NetworkCard = dynamic(() => import('../components/connectors/NetworkCard'), { ssr: false })

export function App() {
  return (
    <>
      <PriorityExample />
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        {/*<MetaMaskCard />*/}
        {/*<WalletConnectCard />*/}
        {/*<WalletLinkCard />*/}
        {/*<NetworkCard />*/}
      </div>

      <CubeWrapper/>
    </>

  )
}
