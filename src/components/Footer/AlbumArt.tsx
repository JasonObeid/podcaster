import React from "react";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Types } from "podcastindexjs";
import { getPodcastFromId, getImage } from "../../utils/utils";
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
    height: "56px",
    width: "56px",
  },
  title: {
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
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

  const podcast =
    activeEpisode !== undefined
      ? getPodcastFromId(subscriptions, activeEpisode.feedId)
      : null;

  return (
    <>
      {activeEpisode !== undefined ? (
        <NavLink to={`/episode/${activeEpisode.id}`}>
          <Image
            publicId={getImage(activeEpisode.image, activeEpisode.feedImage)}
            type="fetch"
            className={classes.rounded}
            alt={podcast?.title}
            title={podcast?.title}
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
        <div className={classes.emptyIcon}></div>
      )}
      {activeEpisode !== undefined ? (
        <Box paddingLeft="16px">
          <MuiLink
            gutterBottom
            variant="subtitle2"
            className={classes.title}
            component={Link}
            to={`/episode/${activeEpisode.id}`}
            title={activeEpisode.title}
          >
            {activeEpisode.title}
          </MuiLink>
          <MuiLink
            variant="caption"
            color="textSecondary"
            component={Link}
            to={`/podcast/${activeEpisode.feedId}`}
            className={classes.author}
            title={podcast?.author}
          >
            {podcast?.author}
          </MuiLink>
        </Box>
      ) : null}
    </>
  );
}
