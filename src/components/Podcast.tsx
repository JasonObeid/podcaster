import { Link as MuiLink } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { usePodcastIndex } from "../context/PodcastIndexContext";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getImage } from "../utils/utils";
import Feeds from "./Feeds";
import { useQuery } from "react-query";
import { auth } from "../config/firebase";
import { updateSubscriptionsDatabase } from "../utils/databaseMutations";
import { podcastParams, PodcastProps } from "../types/podcast";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "minmax(600px, 3fr) minmax(88px, 96px)",
    gridTemplateRows: "1fr",
    gap: "0px 24px",
    gridAutoFlow: "row",
    gridTemplateAreas: '"content icon"',
    alignItems: "center",
  },
  podcast: { marginBottom: "48px" },
  content: { gridArea: "content" },
  icon: {
    gridArea: "icon",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rounded: {
    borderRadius: "8px",
  },
});

function Podcast({
  podcastId,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
  subscriptions,
  setSubscriptions,
}: PodcastProps) {
  const classes = useStyles();

  const { client } = usePodcastIndex();

  const params: podcastParams = useParams();
  const location = useLocation();

  const [podcastIdState, setPodcastIdState] = useState<number | undefined>(
    undefined,
  );
  const [feedId, setFeedId] = useState<number | undefined>(undefined);

  const fetchedPodcast = useQuery(
    `podcastById/${podcastIdState}`,
    getPodcastFromId,
  );
  const podcast = fetchedPodcast?.data;

  const fetchedFeed = useQuery(
    `episodesByFeedId/${feedId}`,
    getFeedFromPodcastId,
  );
  const feed = fetchedFeed?.data;

  async function getPodcastFromId() {
    if (podcastIdState !== undefined) {
      const podcast = await client.podcastById(podcastIdState);
      setFeedId(podcast.feed.id);
      return podcast.feed;
    }
  }

  async function getFeedFromPodcastId() {
    if (feedId !== undefined && podcast !== undefined) {
      const episodes = await client.episodesByFeedId(feedId);
      return episodes.items;
    }
  }

  async function getPodcastId() {
    if (podcastId !== undefined) {
      setPodcastIdState(podcastId);
    }
    if (params.podcastId !== undefined) {
      setPodcastIdState(parseInt(params.podcastId));
    }
  }

  useEffect(() => {
    getPodcastId();
  }, []);

  function isSubscribed() {
    return (
      podcast !== undefined &&
      subscriptions.map((sub) => sub.id).includes(podcast.id)
    );
  }

  async function onPressButton() {
    isSubscribed() ? unsubscribe() : subscribe();
  }

  async function subscribe() {
    if (podcast !== undefined) {
      const newSubscription = await client.podcastById(podcast.id);
      const newSubscriptions = [...subscriptions, newSubscription.feed];
      setSubscriptions(newSubscriptions);
      updateSubscriptionsDatabase(newSubscriptions, auth.currentUser);
    }
  }

  async function unsubscribe() {
    if (podcast !== undefined) {
      const newSubscriptions = subscriptions.filter((subscription) => {
        return subscription.id !== podcast.id;
      });
      setSubscriptions(newSubscriptions);
      updateSubscriptionsDatabase(newSubscriptions, auth.currentUser);
    }
  }

  return (
    <Fragment>
      {podcast !== undefined ? (
        <Card
          component="article"
          className={
            location.pathname.includes("podcast") ? classes.podcast : ""
          }
        >
          <CardContent className={classes.container}>
            <Fragment>
              <div className={classes.content}>
                {location.pathname.includes("podcast") ? (
                  <Typography variant="h5" component="h5" gutterBottom>
                    {podcast.title}
                  </Typography>
                ) : (
                  <MuiLink
                    component={Link}
                    gutterBottom
                    variant="h5"
                    to={`/podcast/${podcast.id}`}
                  >
                    {podcast.title}
                  </MuiLink>
                )}
                <Typography variant="body2" color="textSecondary" component="p">
                  {podcast.description}
                </Typography>
              </div>
              <div className={classes.icon}>
                <img
                  className={classes.rounded}
                  src={getImage(podcast.artwork, podcast.image)}
                  height="80px"
                  width="auto"
                ></img>
              </div>
            </Fragment>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={onPressButton}>
              {isSubscribed() ? "Unsubscribe" : "Subscribe"}
            </Button>
          </CardActions>
        </Card>
      ) : null}
      {feed !== undefined && location.pathname.includes("podcast") ? (
        <Fragment>
          <Typography variant="h6" component="h6">
            Episodes
          </Typography>
          <Feeds
            episodes={feed}
            playbackStates={playbackStates}
            activeEpisode={activeEpisode}
            setActiveEpisode={setActiveEpisode}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          ></Feeds>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
export default Podcast;
