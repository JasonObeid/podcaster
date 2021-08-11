import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ApiResponse, PIApiEpisodeInfo } from "../podcast-client/types";
import { makeStyles } from "@material-ui/styles";
import { Link as MuiLink } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  endItems: {
    display: "flex",
    justifyContent: "flex-end",
    columnGap: "24px",
  },
  rounded: {
    borderRadius: "0.7rem",
  },
  play: {
    display: "flex",
    flexDirection: "column",
    rowGap: "8px",
    alignItems: "center",
  },
});

// function cleanText(text: string) {
//   const trimmedArray = text.slice(0, 150).split(" ");
//   const truncateLastWord = trimmedArray.slice(0, trimmedArray.length - 1);
//   return truncateLastWord.join(" ") + "...";
// }

type FeedProps = {
  activeEpisode: PIApiEpisodeInfo | undefined;
  setActiveEpisode: React.Dispatch<
    React.SetStateAction<PIApiEpisodeInfo | undefined>
  >;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  episode: PIApiEpisodeInfo;
  playbackStates: Map<number, number>;
};

function getCurrentPlayback(
  playbackStates: Map<number, number>,
  episodeID: number,
  duration: number,
): number {
  if (
    playbackStates !== undefined &&
    playbackStates instanceof Map &&
    playbackStates.has(episodeID)
  ) {
    const time = playbackStates.get(episodeID) || 0;
    return Math.round((time / duration) * 100);
  }
  return 0;
}

const ContextualComponent = ({ html }) => {
  const ref = useRef(null);

  useEffect(() => {
    const { current } = ref;

    const documentFragment = document
      .createRange()
      .createContextualFragment(html);

    if (current !== null) {
      current.appendChild(documentFragment);
    }

    return () => {
      current.textContent = "";
    };
  }, [html]);

  return <Fragment ref={ref} />;
};

function getDescriptionText(html): string {
  return document.createRange().createContextualFragment(html).textContent;
}

function Episode({
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  episode,
  playbackStates,
}: FeedProps) {
  async function onPressButton() {
    console.log(episode);
    setActiveEpisode(episode);
    setIsPlaying(!isPlaying);
  }
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          wrap="nowrap"
        >
          <Grid item>
            <MuiLink
              component={Link}
              gutterBottom
              variant="subtitle2"
              to={`/episode/${episode.id}`}
            >
              {episode.title}
            </MuiLink>
            <Typography variant="body2" color="textSecondary" component="p">
              {getDescriptionText(episode.description)}
            </Typography>
            {/* <ContextualComponent html={episode.description} /> */}
          </Grid>
          <Grid item xs={2} className={classes.endItems}>
            <Box>
              <Typography variant="body2" color="textSecondary" component="p">
                {new Date(episode.datePublished * 1000).toLocaleDateString()}
              </Typography>
              <img
                src={episode.image}
                height="48px"
                width="auto"
                className={classes.rounded}
              ></img>
            </Box>
            <Box className={classes.play}>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${Math.round(episode.duration / 60)} mins`}
              </Typography>
              <IconButton onClick={onPressButton}>
                {isPlaying && activeEpisode?.id === episode.id ? (
                  <PauseCircleFilledIcon fontSize="large" />
                ) : (
                  <PlayCircleFilledIcon fontSize="large" />
                )}
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <LinearProgress
        variant="determinate"
        value={getCurrentPlayback(playbackStates, episode.id, episode.duration)}
      />
    </Card>
  );
}

export default React.memo(Episode);
