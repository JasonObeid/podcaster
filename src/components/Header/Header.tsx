import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNextRounded";
import React from "react";
import { useHistory } from "react-router";

export default function Header() {
  const history = useHistory();

  return (
    <>
      <IconButton onClick={() => history.goBack()}>
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton onClick={() => history.goForward()}>
        <NavigateNextIcon />
      </IconButton>
    </>
  );

  // const canGoBack = history.action !== "POP";
  // const canGoForward = history.action !== "PUSH";
  // return (
  //   <>
  //     <IconButton
  //       onClick={() => (canGoBack ? history.goBack() : undefined)}
  //       disabled={!canGoBack}
  //     >
  //       <NavigateBeforeIcon />
  //     </IconButton>
  //     <IconButton
  //       onClick={() => (canGoForward ? history.goForward() : undefined)}
  //       disabled={!canGoForward}
  //     >
  //       <NavigateNextIcon />
  //     </IconButton>
  //   </>
  // );
}
