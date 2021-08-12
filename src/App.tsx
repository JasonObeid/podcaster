import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useEffect, useRef, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { usePodcastIndex } from "./context/PodcastIndexContext";
import {
  PIApiEpisodeInfo,
  PIApiFeed,
  PIApiPodcast,
} from "./podcast-client/types";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Feeds from "./components/Feeds";
import Search from "./components/Search";
import Subscriptions from "./components/Subscriptions";
import { Box, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Podcast from "./components/Podcast";
import catIcon from "./assets/cat.svg";
import Button from "@material-ui/core/Button";
import Episode from "./components/Episode";
import { getImage } from "./utils/utils";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "minmax(208px, 256px) minmax(720px, 1fr)",
    gridTemplateRows:
      "minmax(24px, 48px) minmax(600px, 1fr) minmax(88px, 120px)",
    gap: "16px 16px",
    gridAutoFlow: "row",
    gridTemplateAreas:
      '"logo header header" "navigation content content" "art controls controls"',
    height: "100%",
  },
  logo: { gridArea: "logo", display: "flex" },
  header: {
    gridArea: "header",
    display: "flex",
    alignItems: "center",
    padding: "0px 16px",
  },
  navigation: { gridArea: "navigation" },
  content: {
    gridArea: "content",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "0px 16px",
  },
  controls: { gridArea: "controls", padding: "0px 16px" },
  art: {
    gridArea: "art",
    paddingLeft: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rounded: {
    borderRadius: "0.7rem",
  },
  buttonPadding: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  headerText: {
    paddingLeft: "8px",
  },
}));
function isHistoryLeaf(history: any) {
  // if (!history) return false;

  // if (history.length === 1) return true;

  // return history.location.pathname === history.entries[0].pathname;
  return true;
}
function isHistoryRoot(history: any) {
  // if (!history) return false;

  // if (history.length === 1) return true;

  // return history.location.pathname === history.entries[0].pathname;
  return true;
}
export function App() {
  const classes = useStyles();
  const history = useHistory();
  console.log(history);
  const { client } = usePodcastIndex();

  const [subscriptions, setSubscriptions] = useState<PIApiPodcast[]>([]);
  const [feed, setFeed] = useState<PIApiEpisodeInfo[]>([]);

  // const storage = localStorage.getItem("userIsLoggedIn");
  // const initialLogin = storage !== null ? storage : false;
  // const [userIsLoggedIn, setUserIsLoggedIn] = useState(initialLogin);

  //search
  const [searchResults, setSearchResults] = useState<PIApiFeed[]>([]);

  //playback
  const [playbackStates, setPlaybackStates] = useState<Map<number, number>>(
    new Map<number, number>(),
  );
  const [activeEpisode, setActiveEpisode] = useState<
    PIApiEpisodeInfo | undefined
  >(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const isInitialMount = useRef(false);

  // async function test() {
  //   const podcasts = await client.search("syntax fm");
  //   console.log(podcasts);
  //   const episode = await client.episodesByFeedId(podcasts.feeds[0].id);
  //   console.log(episode);
  //   setActiveEpisode(episode.items[0]);
  // }
  // useEffect(() => {
  //   test();
  // }, []);

  // async function getStoredState() {
  //   const response = await getPodcaster(uuid);
  //   console.log(response);
  //   const newPlaybackStates = JSON.parse(response.playbackStates, reviver);
  //   console.log(newPlaybackStates);
  //   setSubscriptions(response.subscriptions);
  //   setPlaybackStates(newPlaybackStates);
  //   setActiveEpisode(response.activeEpisode);
  // }
  // // async function getSubscriptionsDetails() {
  // //   const response = await returnPost("api/getSubscriptionsDetails", {
  // //     subscriptions: subscriptions,
  // //   });
  // //   setSubscriptionDetails(response);
  // //   console.log(response);
  // // }
  async function getFeedEpisodes() {
    const episodes: PIApiEpisodeInfo[] = [];
    subscriptions.forEach(async function (sub) {
      const subscriptionEpisodes = await client.episodesByFeedId(sub.id, {
        max: 10,
        fulltext: true,
      });
      subscriptionEpisodes.items.forEach((episode) => episodes.push(episode));
    });

    const sortedEpisodes = episodes.sort(function (a, b) {
      const dateA = a.datePublished;
      const dateB = b.datePublished;
      if (dateA === dateB) return 0;

      return dateA < dateB ? -1 : 1;
    });
    setFeed(sortedEpisodes);
  }

  // // useEffect(() => {
  // //   //get();
  // //   getStoredState();
  // // }, []);

  // // //}, [volume]);

  function getEpisodeAuthor(subscriptions: any[], feedId: any) {
    const subscription = subscriptions.find(
      (subscription: { id: any }) => subscription.id === feedId,
    );
    if (subscription) return subscription.author;
    return "";
  }
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getFeedEpisodes();
    }
  }, [subscriptions]);

  return (
    <Router>
      <div className={classes.container}>
        <header className={classes.logo}>
          <Button color="primary" className={classes.buttonPadding}>
            <Typography
              variant="h6"
              component="h1"
              className={classes.headerText}
            >
              poochcaster
            </Typography>
            <img src={catIcon} height="24px" width="auto" alt="cat"></img>
          </Button>
        </header>
        <header className={classes.header}>
          <IconButton
            onClick={() => history.goBack()}
            disabled={!isHistoryRoot(history)}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            onClick={() => history.goForward()}
            disabled={!isHistoryLeaf(history)}
          >
            <NavigateNextIcon />
          </IconButton>
        </header>
        <nav className={classes.navigation}>
          <Sidebar />
        </nav>
        <main className={classes.content}>
          <Switch>
            <Route path="/search/:term">
              <Search
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
              />
            </Route>
            <Route path="/search">
              <Search
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
              />
            </Route>
            <Route exact path="/feed">
              <Feeds
                playbackStates={playbackStates}
                feed={feed}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></Feeds>
            </Route>
            <Route exact path="/episode/:episodeId">
              <Episode
                playbackStates={playbackStates}
                episode={undefined}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></Episode>
            </Route>
            <Route exact path="/subscriptions">
              <Subscriptions
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
              />
            </Route>
            <Route exact path="/settings">
              <div></div>
            </Route>
            <Route exact path="/podcast/:podcastId">
              <Podcast
                podcast={undefined}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
              ></Podcast>
            </Route>
          </Switch>
        </main>
        <footer className={classes.controls}>
          <Player
            playbackStates={playbackStates}
            activeEpisode={activeEpisode}
            subscriptions={subscriptions}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            feed={feed}
            setPlaybackStates={setPlaybackStates}
            setActiveEpisode={setActiveEpisode}
          />
        </footer>
        <footer className={classes.art}>
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
            <Typography gutterBottom variant="subtitle2" component="h6">
              {activeEpisode !== undefined ? activeEpisode.title : ""}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {activeEpisode !== undefined
                ? getEpisodeAuthor(subscriptions, activeEpisode.feedId)
                : ""}
            </Typography>
          </Box>
        </footer>
      </div>
    </Router>
  );
}

export default React.memo(App);
