import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { auth, database, ref } from "./config/firebase";
import { usePodcastIndex } from "./context/PodcastIndexContext";
import { Types } from "podcastindexjs";
import Sidebar from "./components/Sidebar";
import Feeds from "./components/Feeds";
import Search from "./components/Search";
import Subscriptions from "./components/Subscriptions";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Podcast from "./components/Podcast";
import Episode from "./components/Episode";
import {
  isActiveEpisode,
  isSubscription,
  useQueriesTyped,
} from "./utils/utils";
import Login from "./components/Login/Login";
import { get } from "firebase/database";
import { User } from "firebase/auth";
import AlbumArt from "./components/Footer/AlbumArt";
import Header from "./components/Header/Header";
import Logo from "./components/Header/Logo";
import Footer from "./components/Footer/Footer";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.light,
    display: "grid",
    gridTemplateColumns: "minmax(208px, 256px) minmax(720px, 1fr)",
    gridTemplateRows:
      "minmax(24px, 48px) minmax(600px, 1fr) minmax(72px, 88px)",
    // gap: "16px 16px",
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
    padding: "0px 24px",
  },
  navigation: { gridArea: "navigation" },
  content: {
    gridArea: "content",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "0px 24px",
  },
  controls: {
    gridArea: "controls",
    padding: "0px 24px",
    backgroundColor: theme.palette.primary.contrastText,
  },
  art: {
    gridArea: "art",
    paddingLeft: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

function App() {
  const classes = useStyles();

  const location = useLocation();
  const { client } = usePodcastIndex();

  const [loading, setLoading] = useState<boolean>(true);
  const [subscriptions, setSubscriptions] = useState<Types.PIApiPodcast[]>([]);
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

  const episodes = userQueries.flatMap((feedQuery) =>
    feedQuery.isSuccess && feedQuery.data !== undefined ? feedQuery.data : [],
  );

  const sortedEpisodes = episodes.flat().sort(function (a, b) {
    const dateA = a.datePublished;
    const dateB = b.datePublished;
    if (dateA === dateB) return 0;

    return dateA < dateB ? 1 : -1;
  });

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
      setLoading(true);
      if (user !== null) {
        console.log("User detected.");
        loadSubscriptionsStateFromDatabase(user);
        loadActiveEpisodeStateFromDatabase(user);
      } else {
        loadSubscriptionsStateFromLocal();
        loadActiveEpisodeStateFromLocal();
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className={classes.container}>
      <header className={classes.logo}>
        <Logo></Logo>
      </header>
      <header className={classes.header}>
        <Header></Header>
      </header>
      <nav className={classes.navigation}>
        <Sidebar />
      </nav>
      <main className={classes.content}>
        <Switch location={location}>
          <Route exact path="/">
            <Fade>
              <Feeds
                episodes={sortedEpisodes}
                playbackStates={playbackStates}
                activeEpisode={activeEpisode}
                setActiveEpisode={setActiveEpisode}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              ></Feeds>
            </Fade>
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
      </main>
      <footer className={classes.controls}>
        {activeEpisode !== undefined ? (
          <Footer
            episodes={sortedEpisodes}
            playbackStates={playbackStates}
            activeEpisode={activeEpisode}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setPlaybackStates={setPlaybackStates}
            setActiveEpisode={setActiveEpisode}
          />
        ) : null}
      </footer>
      <footer className={classes.art}>
        <AlbumArt
          activeEpisode={activeEpisode}
          subscriptions={subscriptions}
        ></AlbumArt>
      </footer>
    </div>
  );
}

export default App;
