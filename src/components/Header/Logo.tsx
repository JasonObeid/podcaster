import React from "react";
import catIcon from "../../assets/cat.svg";
import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
    backgroundColor: `${theme.palette.info.main}66`,
  },
  headerText: {
    paddingLeft: "8px",
  },
}));

export default function Logo() {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      className={classes.button}
      component={NavLink}
      to="/"
    >
      <Typography variant="h6" component="h1" className={classes.headerText}>
        podcaster
      </Typography>
      <img src={catIcon} height="24px" width="auto" alt="cat"></img>
    </Button>
  );
}
