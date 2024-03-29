import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/HomeRounded";
import SearchIcon from "@material-ui/icons/SearchRounded";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import SubscriptionsIcon from "@material-ui/icons/SubscriptionsRounded";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  blackText: {
    color: "black",
  },
  listRoot: {
    padding: "0px",
  },
});

function Sidebar() {
  const classes = useStyles();

  const location = useLocation();

  return (
    <>
      <List
        component="nav"
        aria-label="home search subscriptions settings"
        classes={{ root: classes.listRoot }}
      >
        <ListItem
          component={Link}
          to="/"
          selected={location.pathname === "/"}
          className={classes.blackText}
        >
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          component={Link}
          to="/search"
          selected={location.pathname.includes("/search")}
          className={classes.blackText}
        >
          <ListItemIcon>
            <SearchIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>

        <ListItem
          component={Link}
          to="/subscriptions"
          selected={location.pathname === "/subscriptions"}
          className={classes.blackText}
        >
          <ListItemIcon>
            <SubscriptionsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Subscriptions" />
        </ListItem>
        <ListItem
          component={Link}
          to="/settings"
          selected={location.pathname === "/settings"}
          className={classes.blackText}
        >
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </>
  );
}

export default Sidebar;
