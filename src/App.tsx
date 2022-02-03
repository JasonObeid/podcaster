import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { auth, database, ref } from "./config/firebase";
import { usePodcastIndex } from "./context/PodcastIndexContext";
import { Types } from "podcastindexjs";
import Sidebar from "./components/Sidebar";
const Home = lazy(() => import("./components/Feeds"));
const Subscriptions = lazy(() => import("./components/Subscriptions"));
const Login = lazy(() => import("./components/Login/Login"));
const Search = lazy(() => import("./components/Search"));
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Podcast from "./components/Podcast";
import Episode from "./components/Episode";
import { isActiveEpisode, isSubscription } from "./utils/utils";
import { get } from "firebase/database";
import { User } from "firebase/auth";
import AlbumArt from "./components/Footer/AlbumArt";
import Header from "./components/Header/Header";
import Logo from "./components/Header/Logo";
import Footer from "./components/Footer/Footer";
import { useQuery } from "react-query";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.light,
    display: "grid",
    gridTemplateColumns: "minmax(208px, 256px) minmax(720px, 1fr)",
    gridTemplateRows:
      "minmax(36px, 48px) minmax(600px, 1fr) minmax(72px, 88px)",
    gridAutoFlow: "row",
    gridTemplateAreas:
      '"logo header header" "navigation content content" "art controls controls"',
    height: "100%",
  },
  logo: {
    gridArea: "logo",
    display: "flex",
  },
  header: {
    gridArea: "header",
    display: "flex",
    alignItems: "center",
    padding: "0px 24px",
    paddingRight: "280px",
  },
  navigation: {
    gridArea: "navigation",
    backgroundColor: `${theme.palette.info.main}66`,
  },
  content: {
    gridArea: "content",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "0px 24px",
    paddingRight: "280px",
    marginBottom: "8px",
    minWidth: "720px",
  },
  controls: {
    gridArea: "controls",
    padding: "0px 24px",
    backgroundColor: theme.palette.info.main,
  },
  art: {
    gridArea: "art",
    paddingLeft: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.info.main,
  },
}));

function App() {
  const classes = useStyles();

  const location = useLocation();
  const { client } = usePodcastIndex();

  const [subscriptions, setSubscriptions] = useState<Types.PIApiPodcast[]>([]);
  const [playbackStates, setPlaybackStates] = useState<Map<number, number>>(
    new Map<number, number>(),
  );
  const [activeEpisode, setActiveEpisode] = useState<
    Types.PIApiEpisodeInfo | undefined
  >(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [maxEpisodes] = useState<number>(10);
  const feedIds = subscriptions.map((sub) => sub.id);
  const fetchedFeed = useQuery(
    `episodesByFeedId/${feedIds.join(",")}/${maxEpisodes}`,
    getFeedEpisodes,
  );
  const episodes = fetchedFeed?.data;

  async function getFeedEpisodes() {
    if (feedIds.length > 0) {
      const subscriptionEpisodes = await client.episodesByFeedId(feedIds, {
        max: maxEpisodes,
        fulltext: true,
      });
      return subscriptionEpisodes.items;
    }
  }

  const sortedEpisodes = episodes !== undefined ? episodes : [];

  async function loadSubscriptionsStateFromDatabase(user: User) {
    try {
      const subscriptionsRef = ref(database, `users/${user.uid}/subscriptions`);
      const subscriptionsSnapshot = await get(subscriptionsRef);
      if (subscriptionsSnapshot.exists()) {
        const subscriptionsData = subscriptionsSnapshot.val();
        if (isSubscription(subscriptionsData)) {
          const subs: Types.PIApiPodcast[] = subscriptionsData;
          setSubscriptions(subs);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loadActiveEpisodeStateFromDatabase(user: User) {
    try {
      const activeEpisodeRef = ref(database, `users/${user.uid}/activeEpisode`);
      const activeEpisodeSnapshot = await get(activeEpisodeRef);
      if (activeEpisodeSnapshot.exists()) {
        const activeEpisodeData = activeEpisodeSnapshot.val();
        if (isActiveEpisode(activeEpisodeData)) {
          const activeEpisode: Types.PIApiEpisodeInfo = activeEpisodeData;
          setActiveEpisode(activeEpisode);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loadSubscriptionsStateFromLocal() {
    const data = localStorage.getItem("subscriptions");
    if (data !== null && isSubscription(JSON.parse(data))) {
      const subs: Types.PIApiPodcast[] = JSON.parse(data);
      setSubscriptions(subs);
    }
  }

  async function loadActiveEpisodeStateFromLocal() {
    const data = localStorage.getItem("activeEpisode");
    if (data !== null && isActiveEpisode(JSON.parse(data))) {
      const activeEpisode: Types.PIApiEpisodeInfo = JSON.parse(data);
      setActiveEpisode(activeEpisode);
    }
  }

  // Monitor and Update user state.
  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      if (user !== null) {
        loadSubscriptionsStateFromDatabase(user);
        loadActiveEpisodeStateFromDatabase(user);
      } else {
        loadSubscriptionsStateFromLocal();
        loadActiveEpisodeStateFromLocal();
      }
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Logo></Logo>
      </div>
      <header className={classes.header}>
        <Header></Header>
      </header>
      <nav className={classes.navigation}>
        <Sidebar />
      </nav>
      <main className={classes.content}>
        {/* <Fade in={isNewPage}> */}
        <Suspense fallback={null}>
          <Switch location={location}>
            <Route exact path="/">
              <Home
                episodes={sortedEpisodes}
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></Home>
            </Route>
            <Route path="/search/:term">
              <Search
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </Route>
            <Route path="/search/:term">
              <Search
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </Route>
            <Route path="/search">
              <Search
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
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
        </Suspense>
        {/* </Fade> */}
      </main>
      <div className={classes.controls}>
        <Footer
          episodes={sortedEpisodes}
          playbackStates={playbackStates}
          activeEpisode={activeEpisode}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setPlaybackStates={setPlaybackStates}
          setActiveEpisode={setActiveEpisode}
        />
      </div>
      <div className={classes.art}>
        <AlbumArt
          activeEpisode={activeEpisode}
          subscriptions={subscriptions}
        ></AlbumArt>
      </div>
    </div>
  );
}

export default App;
