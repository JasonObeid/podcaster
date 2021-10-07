import { Box, Link as MuiLink } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
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
import { Image, Transformation } from "cloudinary-react";
import Skeleton from "@material-ui/lab/Skeleton";
import clsx from "clsx";
// import FilterListIcon from "@material-ui/icons/FilterList";
// import { useDebounce } from "@react-hook/debounce";
// import ClearIcon from "@material-ui/icons/Clear";
const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gridTemplateRows: "1fr",
    gap: "0px 24px",
    gridAutoFlow: "row",
    gridTemplateAreas: '"content icon"',
    alignItems: "center",
  },
  podcast: { marginBottom: "48px" },
  content: {
    gridArea: "content",
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  icon: {
    gridArea: "icon",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rounded: {
    borderRadius: "4px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: 16,
    paddingBottom: 0,
  },
  skeletonHeader: {
    padding: 16,
    paddingBottom: 0,
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

  const podcastFeedId = feedId || podcast?.id;
  const fetchedFeed = useQuery(
    `episodesByFeedId/${podcastFeedId}`,
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
    if (podcastFeedId !== undefined) {
      const episodes = await client.episodesByFeedId(podcastFeedId);
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

  // const [searchText, setSearchText] = useState("");
  // const [searchFilterText, setSearchFilterText] = useDebounce("", 200);

  // function handleFilterTextChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   setSearchText(event.target.value);
  //   setSearchFilterText(event.target.value);
  // }

  // function onClearFilter() {
  //   setSearchText("");
  //   setSearchFilterText("");
  // }

  // const filteredFeeds = feed?.filter(
  //   (feed) =>
  //     feed.title.toLowerCase().includes(searchFilterText.toLowerCase()) ||
  //     feed.description.toLowerCase().includes(searchFilterText.toLowerCase()),
  // );

  function getPodcastCard() {
    return (
      <>
        {podcast !== undefined ? (
          <Card
            component="article"
            className={
              location.pathname.includes("podcast") ? classes.podcast : ""
            }
          >
            <div className={classes.header}>
              {location.pathname.includes("podcast") ? (
                <Typography variant="h5" component="h2">
                  {podcast.title}
                </Typography>
              ) : (
                <MuiLink
                  component={Link}
                  variant="h5"
                  to={`/podcast/${podcast.id}`}
                >
                  {podcast.title}
                </MuiLink>
              )}
            </div>
            <CardContent className={classes.container}>
              <>
                <div className={classes.content}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {podcast.description}
                  </Typography>
                </div>
                <div className={classes.icon}>
                  <Image
                    publicId={getImage(podcast.artwork, podcast.image)}
                    type="fetch"
                    className={classes.rounded}
                    alt={podcast.title}
                  >
                    <Transformation
                      width="auto"
                      height={80}
                      crop="fill"
                      quality="auto"
                    />
                  </Image>
                </div>
              </>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={onPressButton}>
                {isSubscribed() ? "Unsubscribe" : "Subscribe"}
              </Button>
            </CardActions>
          </Card>
        ) : null}
        {location.pathname.includes("podcast") && feed !== undefined ? (
          <>
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="space-between"
              alignItems="flex-end"
              marginBottom="8px"
            >
              <Typography variant="h6" component="h3">
                Episodes
              </Typography>
              {/* <TextField
                label="Filter Episodes"
                value={searchText}
                onChange={handleFilterTextChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onClearFilter} color="secondary">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}
            </Box>
            <Feeds
              episodes={feed}
              playbackStates={playbackStates}
              activeEpisode={activeEpisode}
              setActiveEpisode={setActiveEpisode}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            ></Feeds>
          </>
        ) : null}
      </>
    );
  }

  function getPodcastSkeleton() {
    return (
      <>
        <Card
          component="article"
          className={
            location.pathname.includes("podcast") ? classes.podcast : ""
          }
        >
          <div className={clsx(classes.skeletonHeader, classes.container)}>
            <>
              <div className={classes.content}>
                <Skeleton variant="rect" height={32} />
              </div>
              <div className={classes.icon}></div>
            </>
          </div>
          <CardContent className={classes.container}>
            <>
              <div className={classes.content}>
                <Skeleton variant="rect" height={80} />
              </div>
              <div className={classes.icon}>
                <Skeleton variant="rect" height={80} width={80} />
              </div>
            </>
          </CardContent>
          <CardActions>
            <Skeleton
              variant="rect"
              height={22}
              width={90}
              style={{ margin: "8px" }}
            />
          </CardActions>
        </Card>
        {feed !== undefined && location.pathname.includes("podcast") ? (
          <>
            <Typography variant="h6" component="h3">
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
          </>
        ) : null}
      </>
    );
  }

  return podcast !== undefined ? getPodcastCard() : getPodcastSkeleton();
}
export default Podcast;
