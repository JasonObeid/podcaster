import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//@ts-ignore
import firebase from "firebase";

import { auth, signInWithPopup } from "../config/firebase";
import { Providers } from "../config/firebase";

function Login() {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const history = useHistory();

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");

    setAuthenticating(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = provider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = provider.credentialFromError(error);
        // ...
      });
    // SignInWithSocialMedia(provider)
    //   .then((result) => {
    //     history.push("/");
    //   })
    //   .catch((error) => {
    //     setAuthenticating(false);
    //     setError(error.message);
    //   });
  };

  return (
    <div className="AuthLogin">
      <div className="auth-main-container">
        <div>
          <h1>Welcome to React App</h1>
          <p>Please Signup to continue by choosing one of the options below.</p>
        </div>
        <div className="auth-btn-wrapper">
          <button
            disabled={authenticating}
            onClick={() => signInWithSocialMedia(Providers.google)}
          >
            SignUp with Google
          </button>

          <Link to={`/`}>
            <button>Back To Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
