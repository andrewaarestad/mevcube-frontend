import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import theme from "./theme";
import {ThemeProvider} from "styled-components";
import {UseWalletProvider} from "use-wallet";
import {Provider} from "react-redux";
import store from "./store";
import ModalsProvider from './contexts/Modals'
import {App} from "./containers/app";

// TODO: Get rid of this css file...
import './index.scss';

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.warn = () => {}
  console.debug = () => {}
}

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
