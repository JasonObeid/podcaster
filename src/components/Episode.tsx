import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { auth } from "../config/firebase";
import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link as MuiLink } from "@material-ui/core";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { usePodcastIndex } from "../context/PodcastIndexContext";
import { getImage } from "../utils/utils";
import { useQuery } from "react-query";
import { updateActiveEpisodeDatabase } from "../utils/databaseMutations";
import { episodeParams, EpisodeProps } from "../types/episode";

const useStyles = makeStyles({
  endItems: {
    display: "flex",
    justifyContent: "flex-end",
    columnGap: "24px",
  },
  rounded: {
    borderRadius: "8px",
  },
  play: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
});

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

function getDescriptionHTML(html: string): Node {
  return document.createRange().createContextualFragment(html);
}

function Episode({
  episodeId,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
}: EpisodeProps) {
  async function onPressButton() {
    if (data !== undefined) {
      if (episode !== undefined) {
        setActiveEpisode(episode);
        updateActiveEpisodeDatabase(episode, auth.currentUser);
      }

      setIsPlaying(!isPlaying);
    }
  }

  const classes = useStyles();

  const location = useLocation();
  const params: episodeParams = useParams();

  const { client } = usePodcastIndex();
  const [episodeIdState, setEpisodeIdState] = useState<number | null>(null);

  async function fetchEpisode() {
    if (episodeIdState !== null) {
      const resp = await client.episodeById(episodeIdState);
      return resp;
    }
  }

  const { data } = useQuery(`episodeById/${episodeIdState}`, fetchEpisode);
  const episode = data?.episode;

  async function getEpisodeFromId() {
    if (episodeId !== undefined) {
      setEpisodeIdState(episodeId);
    } else if (params.episodeId !== undefined) {
      const episodeId = parseInt(params.episodeId);
      setEpisodeIdState(episodeId);
    }
  }

  useEffect(() => {
    getEpisodeFromId();
  }, []);

  if (episode !== undefined) {
    const episodeDescriptionNode = getDescriptionHTML(episode.description);
    return (
      <Card component="article">
        <CardContent>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item xs={9}>
              {location.pathname.includes("episode") ? (
                <Fragment>
                  <Typography gutterBottom variant="subtitle2">
                    {episode.title}
                  </Typography>
                  {episodeDescriptionNode}
                </Fragment>
              ) : (
                <Fragment>
                  <MuiLink
                    component={Link}
                    gutterBottom
                    variant="subtitle2"
                    to={`/episode/${episode.id}`}
                  >
                    {episode.title}
                  </MuiLink>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.text}
                  >
                    {episodeDescriptionNode.textContent || ""}
                  </Typography>
                </Fragment>
              )}
            </Grid>
            <Grid item xs={3} className={classes.endItems}>
              <Fragment>
                <Box className={classes.play}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {new Date(
                      episode.datePublished * 1000,
                    ).toLocaleDateString()}
                  </Typography>
                  <img
                    src={getImage(episode.image, episode.feedImage)}
                    height="48px"
                    width="auto"
                    className={classes.rounded}
                  ></img>
                </Box>
                <Box className={classes.play}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`${Math.round(episode.duration / 60)} mins`}
                  </Typography>
                  <IconButton onClick={onPressButton} color="secondary">
                    {isPlaying && activeEpisode?.id === episode.id ? (
                      <PauseCircleFilledIcon fontSize="large" />
                    ) : (
                      <PlayCircleFilledIcon fontSize="large" />
                    )}
                  </IconButton>
                </Box>
              </Fragment>
            </Grid>
          </Grid>
        </CardContent>
        <LinearProgress
          variant="determinate"
          value={getCurrentPlayback(
            playbackStates,
            episode.id,
            episode.duration,
          )}
        />
      </Card>
    );
  }
  return null;
}

export default Episode;