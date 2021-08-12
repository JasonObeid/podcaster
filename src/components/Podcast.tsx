import { Link as MuiLink } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { ApiResponse, PIApiPodcast, PIApiFeed } from "../podcast-client/types";
import { usePodcastIndex } from "../context/PodcastIndexContext";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getImage } from "../utils/utils";

type PodcastProps = {
  // playbackStates: Map<number, number>;
  // activeEpisode: PIApiEpisodeInfo | undefined;
  subscriptions: PIApiPodcast[];
  setSubscriptions: React.Dispatch<React.SetStateAction<PIApiPodcast[]>>;
  podcast: PIApiFeed | undefined;
};

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "minmax(600px, 3fr) minmax(88px, 96px)",
    gridTemplateRows: "1fr",
    gap: "0px 16px",
    gridAutoFlow: "row",
    gridTemplateAreas: '"content icon"',
    alignItems: "center",
  },
  content: { gridArea: "content" },
  icon: { gridArea: "icon", textAlign: "center" },
});

function Podcast({
  podcast,
  subscriptions,
  setSubscriptions,
}: // playbackStates,
// activeEpisode,
PodcastProps) {
  const classes = useStyles();
  const { client } = usePodcastIndex();
  const params = useParams();

  const [podcastState, setPodcastState] = useState(podcast);

  async function getPodcastFromRoute() {
    console.log(params);
    if (params.hasOwnProperty("podcastId")) {
      //@ts-ignore
      const podcast = await client.podcastById(params.podcastId);
      setPodcastState(podcast.feed);
    }
  }
  useEffect(() => {
    getPodcastFromRoute();
  }, []);

  const [alreadySubbed, setAlreadySubbed] = useState(
    podcastState !== undefined &&
      subscriptions.map((sub) => sub.id).includes(podcastState.id),
  );

  useEffect(() => {
    if (podcastState !== undefined) {
      const alreadySubbed = subscriptions
        .map((sub) => sub.id)
        .includes(podcastState.id);
      setAlreadySubbed(alreadySubbed);
    }
  }, [subscriptions]);

  async function onPressButton() {
    alreadySubbed ? unsubscribe() : subscribe();
  }
  async function subscribe() {
    if (podcastState !== undefined) {
      const newSubscription = await client.podcastById(podcastState.id);
      const newSubscriptions = [...subscriptions, newSubscription.feed];
      console.log(newSubscriptions);
      setSubscriptions(newSubscriptions);
    }
  }
  async function unsubscribe() {
    if (podcastState !== undefined) {
      const newSubscriptions = subscriptions.filter((subscription) => {
        return subscription.id !== podcastState.id;
      });
      console.log(newSubscriptions);
      setSubscriptions(newSubscriptions);
    }
  }

  return (
    <Card component="article">
      <CardContent className={classes.container}>
        {podcastState !== undefined ? (
          <Fragment>
            <div className={classes.content}>
              <MuiLink
                component={Link}
                gutterBottom
                variant="h5"
                to={`/podcast/${podcastState.id}`}
              >
                {podcastState.title}
              </MuiLink>
              <Typography variant="body2" color="textSecondary" component="p">
                {podcastState.description}
              </Typography>
            </div>
            <div className={classes.icon}>
              <img
                src={getImage(podcastState.artwork, podcastState.image)}
                height="80px"
                width="auto"
              ></img>
            </div>
          </Fragment>
        ) : null}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onPressButton}>
          {alreadySubbed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </CardActions>
    </Card>
  );
}
export default React.memo(Podcast);
