import React from "react";
import { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Types } from "podcastindexjs";
import { getEpisodeAuthor, getImage } from "../../utils/utils";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) => ({
  rounded: {
    borderRadius: "8px",
  },
  title: {
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  author: {
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
}));

export default function AlbumArt({
  activeEpisode,
  subscriptions,
}: {
  activeEpisode: Types.PIApiEpisodeInfo | undefined;
  subscriptions: Types.PIApiPodcast[];
}) {
  const classes = useStyles();

  return (
    <>
      {activeEpisode !== undefined ? (
        <img
          src={getImage(activeEpisode.image, activeEpisode.feedImage)}
          height="56px"
          width="auto"
          className={classes.rounded}
        ></img>
      ) : (
        <img height="56px" width="56px" className={classes.rounded}></img>
      )}
      <Box paddingLeft="16px">
        <Typography
          gutterBottom
          variant="subtitle2"
          component="h6"
          className={classes.title}
        >
          {activeEpisode !== undefined ? activeEpisode.title : ""}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          className={classes.author}
        >
          {activeEpisode !== undefined
            ? getEpisodeAuthor(subscriptions, activeEpisode.feedId)
            : ""}
        </Typography>
      </Box>
    </>
  );
}
