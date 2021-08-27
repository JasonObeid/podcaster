import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
  useHistory,
} from "react-router-dom";
import { auth, database, ref, onValue } from "./config/firebase";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { usePodcastIndex } from "./context/PodcastIndexContext";
import { Types, PodcastIndexClient } from "podcastindexjs";
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
import { getImage, useQueriesTyped } from "./utils/utils";
import { useQueries, useQuery } from "react-query";
import Login from "./components/Login";
import { User } from "firebase/auth";
import { child, get } from "firebase/database";

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
  // history.;
  // if (!history) return false;

  // if (history.length === 1) return true;

  // return history.location.pathname === history.entries[0].pathname;
  return true;
}

function isHistoryRoot(history: any) {
  // if (!history) return false;

  // if (history.length === 1) return true;

  // return history.location.pathname === history.entries[0].pathname;
  console.log(history.entries);
  return true;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  function getRemoteStates() {}
  // Monitor and Update user state.
  useEffect(() => {
    setLoading(true);
    if (auth.currentUser !== null) {
      console.log("User detected.");
      // const subscriptionsRef = ref(
      //   database,
      //   `users/${auth.currentUser.uid}/subscriptions`,
      // );
      get(child(ref(database), `users/${auth.currentUser.uid}/subscriptions`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const data = snapshot.val();
            setSubscriptions(data);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // onValue(subscriptionsRef, (snapshot) => {
      //   const data = snapshot.val();
      //   setSubscriptions(data);
      // });
    } else {
      console.log("No user detected");
    }
    setLoading(false);
  }, []);

  const classes = useStyles();

  const history = useHistory();

  const { client } = usePodcastIndex();

  const [subscriptions, setSubscriptions] = useState<Types.PIApiPodcast[]>([]);

  //playback
  const [playbackStates, setPlaybackStates] = useState<Map<number, number>>(
    new Map<number, number>(),
  );
  const [activeEpisode, setActiveEpisode] = useState<
    Types.PIApiEpisodeInfo | undefined
  >(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  async function getFeedEpisodes(feedId: number) {
    const subscriptionEpisodes = await client.episodesByFeedId(feedId, {
      max: 10,
      fulltext: true,
    });
    return subscriptionEpisodes.items;
  }

  const userQueries = useQueriesTyped(
    subscriptions.map((sub) => {
      return {
        queryKey: ["episodesByFeedId", sub.id],
        queryFn: () => getFeedEpisodes(sub.id),
      };
    }),
  );

  // const episodes = userQueries
  //   .filter((feedQuery): feedQuery.data is Types.PIApiFeed => feedQuery.isSuccess && feedQuery.data !== undefined)
  //   .map((feedQuery) => feedQuery.data);

  const episodes = userQueries.flatMap((feedQuery) =>
    feedQuery.isSuccess && feedQuery.data !== undefined ? feedQuery.data : [],
  );

  const sortedEpisodes = episodes.flat().sort(function (a, b) {
    const dateA = a.datePublished;
    const dateB = b.datePublished;
    if (dateA === dateB) return 0;

    return dateA < dateB ? -1 : 1;
  });

  function getEpisodeAuthor(subscriptions: any[], feedId: any) {
    const subscription = subscriptions.find(
      (subscription: { id: any }) => subscription.id === feedId,
    );
    if (subscription) return subscription.author;
    return "";
  }

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
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
              />
            </Route>
            <Route path="/search">
              <Search
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
              />
            </Route>
            <Route exact path="/feed">
              <Feeds
                episodes={sortedEpisodes}
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></Feeds>
            </Route>
            <Route exact path="/episode/:episodeId">
              <Episode
                episodeId={undefined}
                playbackStates={playbackStates}
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
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </Route>
            <Route exact path="/settings">
              <Login></Login>
            </Route>
            <Route exact path="/podcast/:podcastId">
              <Podcast
                podcastId={undefined}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></Podcast>
            </Route>
          </Switch>
        </main>
        <footer className={classes.controls}>
          <Player
            episodes={sortedEpisodes}
            playbackStates={playbackStates}
            activeEpisode={activeEpisode}
            subscriptions={subscriptions}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
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

export default App;
