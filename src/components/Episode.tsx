import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilledRounded";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";
import { auth } from "../config/firebase";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link as MuiLink } from "@material-ui/core";
import { useLocation, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { usePodcastIndex } from "../context/PodcastIndexContext";
import { getImage } from "../utils/utils";
import { useQuery } from "react-query";
import { updateActiveEpisodeDatabase } from "../utils/databaseMutations";
import { episodeParams, EpisodeProps } from "../types/episode";
import { Image, Transformation } from "cloudinary-react";
import Skeleton from "@material-ui/lab/Skeleton";
import { PIApiEpisodeDetail } from "podcastindexjs/lib/types";

const useStyles = makeStyles({
  endItems: {
    display: "flex",
    justifyContent: "flex-end",
    columnGap: "24px",
    alignItems: "center",
  },
  rounded: {
    borderRadius: "4px",
  },
  play: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  episodeLink: {
    paddingBottom: "8px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: 16,
    paddingBottom: 0,
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

  function getEpisodeFromId() {
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

  function getEpisodeCard(episode: PIApiEpisodeDetail) {
    const episodeDescriptionNode = getDescriptionHTML(episode.description);
    return (
      <Card>
        <div className={classes.header}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item xs={9}>
              {location.pathname.includes("episode") ? (
                <Typography variant="subtitle2">{episode.title}</Typography>
              ) : (
                <MuiLink
                  component={Link}
                  variant="subtitle2"
                  to={`/episode/${episode.id}`}
                >
                  {episode.title}
                </MuiLink>
              )}
            </Grid>
            <Grid item xs={3} className={classes.endItems}>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${Math.round(episode.duration / 60)} mins`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {new Date(episode.datePublished * 1000).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <CardContent>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item xs={9}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={
                  !location.pathname.includes("episode")
                    ? classes.text
                    : undefined
                }
              >
                {episodeDescriptionNode.textContent || ""}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.endItems}>
              {location.pathname.includes("podcast") ? (
                <Image
                  publicId={getImage(episode.image, episode.feedImage)}
                  type="fetch"
                  className={classes.rounded}
                  alt={episode.title}
                >
                  <Transformation
                    width="auto"
                    height={48}
                    crop="fill"
                    quality="auto"
                  />
                </Image>
              ) : (
                <NavLink to={`/podcast/${episode.feedId}`}>
                  <Image
                    publicId={getImage(episode.image, episode.feedImage)}
                    type="fetch"
                    className={classes.rounded}
                    alt={episode.title}
                  >
                    <Transformation
                      width="auto"
                      height={48}
                      crop="fill"
                      quality="auto"
                    />
                  </Image>
                </NavLink>
              )}
              <IconButton
                onClick={onPressButton}
                color="secondary"
                aria-label={`${isPlaying ? "pause" : "play"}_${episode.id}`}
              >
                {isPlaying && activeEpisode?.id === episode.id ? (
                  <PauseCircleFilledIcon fontSize="large" />
                ) : (
                  <PlayCircleFilledWhiteIcon fontSize="large" />
                )}
              </IconButton>
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
          aria-label={`playback_${episode.title.replaceAll(" ", "_")}`}
        />
      </Card>
    );
  }

  function getEpisodeSkeleton() {
    return (
      <Card>
        <div className={classes.header}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item xs={9}>
              <Skeleton variant="rect" height={20} />
            </Grid>
            <Grid item xs={3} className={classes.endItems}>
              <Skeleton variant="rect" width={40} height={20} />
              <Skeleton variant="rect" width={40} height={20} />
            </Grid>
          </Grid>
        </div>
        <CardContent>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item xs={9}>
              <Skeleton variant="rect" height={80} />
            </Grid>
            <Grid item xs={3} className={classes.endItems}>
              <Skeleton variant="rect" width={48} height={48} />
              <Skeleton variant="circle" width={35} height={35} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  if (episode !== undefined) {
    return getEpisodeCard(episode);
  }
  return getEpisodeSkeleton();
}

export default Episode;
