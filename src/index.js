import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

import Spinner from "./components/@vuexy/spinner/Fallback-spinner";

import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store";

import { Layout } from "./utility/context/Layout";

import * as serviceWorker from "./serviceWorker";

import "./index.scss"
import App from "./App"

const unsubscribe = store.subscribe(() => console.log(store.getState()));
// const unsubscribe = store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Layout>
            <App />
        </Layout>
      </Suspense>
    </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
