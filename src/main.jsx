import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme.js";
import { RecoilRoot } from "recoil";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CssBaseline />
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
