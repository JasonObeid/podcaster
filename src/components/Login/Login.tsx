import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import {
  auth,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "../../config/firebase";
import { Providers } from "../../config/firebase";
import { GoogleLogo } from "./GoogleLogo";
import { Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonIcon from "@material-ui/icons/PersonRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToAppRounded";
import Grid from "@material-ui/core/Grid";
import { GoogleAuthProvider } from "firebase/auth";

const ctheme = "dark";
const useStyles = makeStyles((theme: Theme) => ({
  googleButton: {
    color: ctheme === "dark" ? "#fff" : "rgba(0, 0, 0, .54)",
    padding: "8px",
    backgroundColor: ctheme === "dark" ? "#3367D6" : "#eee",
    textTransform: "none",
    "&:hover": {
      backgroundColor: ctheme === "dark" ? "#1b53e2" : "#eee",
    },
    width: "200px",
    justifyContent: "flex-start",
  },
  defaultButton: {
    padding: "8px",
    textTransform: "none",
    width: "200px",
    justifyContent: "flex-start",
  },
  textStyle: {
    paddingRight: 10,
    fontWeight: 500,
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [authenticating, setAuthenticating] = useState<boolean>(false);

  function signInWithSocialMedia(provider: GoogleAuthProvider) {
    setAuthenticating(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        history.push("/");
      })
      .catch((error) => {
        // const errorMessage = error.message;
      });
    setAuthenticating(false);
  }

  function continueAsGuest() {
    setAuthenticating(true);
    signInAnonymously(auth)
      .then((result) => {
        history.push("/");
      })
      .catch((error) => {
        // const errorMessage = error.message;
      });
    setAuthenticating(false);
  }

  function logout() {
    signOut(auth);
  }

  return (
    <>
      <Typography variant="h3" component="h2" style={{ paddingBottom: "24px" }}>
        Welcome to Podcaster
      </Typography>
      {auth.currentUser === null ? (
        <Typography style={{ paddingBottom: "16px" }}>
          Please sign in to sync your data to your account.
        </Typography>
      ) : (
        <Typography style={{ paddingBottom: "16px" }}>
          Your data is being synced to your account.
        </Typography>
      )}
      <Grid container direction="column" spacing={1} alignItems="stretch">
        {auth.currentUser === null ? (
          <>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                disabled={authenticating}
                onClick={() => signInWithSocialMedia(Providers.google)}
                className={classes.googleButton}
                startIcon={<GoogleLogo disabled={authenticating} />}
              >
                Sign in with Google
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                disabled={authenticating}
                onClick={() => continueAsGuest()}
                className={classes.defaultButton}
                startIcon={
                  <div
                    style={{
                      padding: 5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PersonIcon />
                  </div>
                }
              >
                Sign in anonymously
              </Button>
            </Grid>
          </>
        ) : (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={authenticating}
              onClick={() => logout()}
              className={classes.defaultButton}
              startIcon={
                <div
                  style={{
                    padding: 5,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ExitToAppIcon />
                </div>
              }
            >
              Log out
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Login;
