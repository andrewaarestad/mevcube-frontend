import React from "react";
import {Provider} from "react-redux";
import {App} from "../containers/app";
import store from "../store";


export default function Home() {
  return (
    <>
      <React.StrictMode>
        <Provider store={store}>
          <App/>
        </Provider>
      </React.StrictMode>
    </>
  )
}
