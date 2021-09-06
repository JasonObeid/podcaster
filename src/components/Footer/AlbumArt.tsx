import React from "react";
import { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Types } from "podcastindexjs";
import { getEpisodeAuthor, getImage } from "../../utils/utils";
import Box from "@material-ui/core/Box";
import { Link as MuiLink } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

const useStyles = makeStyles((theme: Theme) => ({
  rounded: {
    borderRadius: "4px",
  },
  emptyIcon: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "4px",
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
        <NavLink to={`/episode/${activeEpisode.id}`}>
          <Image
            publicId={getImage(activeEpisode.image, activeEpisode.feedImage)}
            type="fetch"
            className={classes.rounded}
            alt={activeEpisode.title}
          >
            <Transformation
              width="auto"
              height={56}
              crop="fill"
              quality="auto"
            />
          </Image>
        </NavLink>
      ) : (
        <img height="56px" width="56px" className={classes.emptyIcon}></img>
      )}
      {activeEpisode !== undefined ? (
        <Box paddingLeft="16px">
          <MuiLink
            gutterBottom
            variant="subtitle2"
            className={classes.title}
            component={Link}
            to={`/episode/${activeEpisode.id}`}
          >
            {activeEpisode.title}
          </MuiLink>
          <MuiLink
            variant="caption"
            color="textSecondary"
            component={Link}
            to={`/podcast/${activeEpisode.feedId}`}
            className={classes.author}
          >
            {activeEpisode !== undefined
              ? getEpisodeAuthor(subscriptions, activeEpisode.feedId)
              : ""}
          </MuiLink>
        </Box>
      ) : null}
    </>
  );
}
