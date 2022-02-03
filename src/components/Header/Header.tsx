import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNextRounded";
import React from "react";
import { useHistory } from "react-router";

export default function Header() {
  const history = useHistory();

  return (
    <>
      <IconButton onClick={() => history.goBack()} aria-label="navigate_back">
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton
        onClick={() => history.goForward()}
        aria-label="navigate_forward"
      >
        <NavigateNextIcon />
      </IconButton>
    </>
  );
}
