import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PodcastIndexProvider } from "./context/PodcastIndexContext";
import blueGrey from "@material-ui/core/colors/blueGrey";
import teal from "@material-ui/core/colors/teal";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@material-ui/core";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[700],
    },
    secondary: {
      main: teal[900],
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PodcastIndexProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PodcastIndexProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
