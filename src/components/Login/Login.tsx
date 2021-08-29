import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//@ts-ignore
import firebase from "firebase";
import Button from "@material-ui/core/Button";

import {
  auth,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "../../config/firebase";
import { Providers } from "../../config/firebase";
import GoogleLogo from "./GoogleLogo";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
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
  },
  defaultButton: {
    padding: "8px",
    textTransform: "none",
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

  function signInWithSocialMedia(provider: firebase.auth.AuthProvider) {
    setAuthenticating(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = provider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        history.push("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        // const credential = provider.credentialFromError(error);
        // ...
      });
    setAuthenticating(false);
  }

  function continueAsGuest() {
    setAuthenticating(true);
    signInAnonymously(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = provider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        history.push("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        // const credential = provider.credentialFromError(error);
        // ...
      });
    setAuthenticating(false);
  }

  function logout() {
    signOut(auth);
  }

  return (
    <>
      <h1>Welcome to Podcaster</h1>
      {auth.currentUser === null ? (
        <p>Please sign in to sync your data to your account.</p>
      ) : (
        <p>Your data is being synced to your account.</p>
      )}
      <Grid container direction="column" spacing={2} alignItems="stretch">
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
                      marginRight: 8,
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
                    marginRight: 8,
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
