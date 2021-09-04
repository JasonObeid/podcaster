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
import { QueryClient, QueryClientProvider } from "react-query";
import { CloudinaryContext } from "cloudinary-react";

const theme = createTheme({
  palette: {
    primary: {
      contrastText: blueGrey[50],
      dark: blueGrey[900],
      main: blueGrey[700],
      light: blueGrey[50],
    },
    secondary: {
      dark: teal[900],
      main: teal[800],
      light: teal[100],
    },
    info: {
      main: blueGrey[100],
    },
  },
});

const queryClient = new QueryClient();

const VITE_CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
if (typeof VITE_CLOUDINARY_NAME !== "string")
  throw new Error("Error with Cloudinary Secrets");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/podcaster">
      <QueryClientProvider client={queryClient}>
        <CloudinaryContext
          cloudName={VITE_CLOUDINARY_NAME}
          style={{ height: "100%" }}
        >
          <PodcastIndexProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </PodcastIndexProvider>
        </CloudinaryContext>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
