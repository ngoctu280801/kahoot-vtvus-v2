import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <CookiesProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </CookiesProvider>
        <ToastContainer />
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
