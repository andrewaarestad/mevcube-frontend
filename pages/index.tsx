import React from "react";
import {Provider} from "react-redux";
import {App} from "../containers/app";
import store from "../store";

import ModalsProvider from '../contexts/Modals'
import { UseWalletProvider } from 'use-wallet'
import { ThemeProvider } from 'styled-components'
import theme from "../theme";

export default function Home() {
  return (
    <>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <UseWalletProvider
            autoConnect={false}
            pollBalanceInterval={10000}
            pollBlockNumberInterval={10000}
            connectors={{
              // injected: {
              //   //allows you to connect and switch between mainnet and rinkeby within Metamask.
              //   // chainId: [1, 4, 1337],
              //   chainId: [80001]
              //   // chainId: [80001]
              // },
              // walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
            }}>
            <Provider store={store}>

              <ModalsProvider>
                <App/>
              </ModalsProvider>

            </Provider>
          </UseWalletProvider>
        </ThemeProvider>
      </React.StrictMode>
    </>
  )
}
