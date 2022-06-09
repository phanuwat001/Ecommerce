import React from "react"
import ReactDOM from "react-dom/client"
import axios from "axios"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore } from "redux"
import "antd/dist/antd.css"
import "bootstrap/dist/css/bootstrap.min.css"

import rootReducer from "./reducers"
import App from "./App"

axios.defaults.baseURL = process.env.REACT_APP_API

const store = createStore(rootReducer, composeWithDevTools())
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
