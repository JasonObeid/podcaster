import React from "react";
import { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Types } from "podcastindexjs";
import { getEpisodeAuthor, getImage } from "../../utils/utils";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

const useStyles = makeStyles((theme: Theme) => ({
  rounded: {
    borderRadius: "8px",
  },
  emptyIcon: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "8px",
  },
  title: {
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    color: theme.palette.primary.dark,
    textDecoration: "none",
  },
  author: {
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    color: theme.palette.primary.main,
    textDecoration: "none",
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
        <Image
          publicId={getImage(activeEpisode.image, activeEpisode.feedImage)}
          type="fetch"
          className={classes.rounded}
        >
          <Transformation
            width="auto"
            height={56}
            crop="fill"
            alt={activeEpisode.title}
          />
        </Image>
      ) : (
        <img height="56px" width="56px" className={classes.emptyIcon}></img>
      )}
      <Box paddingLeft="16px">
        {activeEpisode !== undefined ? (
          <>
            <Typography
              gutterBottom
              variant="subtitle2"
              component={NavLink}
              to={`/episode/${activeEpisode.id}`}
              className={classes.title}
            >
              {activeEpisode.title}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              component={NavLink}
              to={`/podcast/${activeEpisode.feedId}`}
              className={classes.author}
            >
              {activeEpisode !== undefined
                ? getEpisodeAuthor(subscriptions, activeEpisode.feedId)
                : ""}
            </Typography>
          </>
        ) : null}
      </Box>
    </>
  );
}
