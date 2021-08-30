var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { i as initializeApp, G as GoogleAuthProvider, g as getAuth, a as getDatabase, P as PodcastIndexClient_1, R as React, m as makeStyles, u as useLocation, L as List, b as ListItem, c as Link, d as ListItemIcon, e as default_1, f as ListItemText, h as default_1$1, j as default_1$2, k as default_1$3, l as useQueries, r as ref, s as set, n as useParams, C as C__Users_Jason_Documents_podcaster_node_modules_react, o as useQuery, p as Card, q as CardContent, t as Grid, T as Typography, M as MuiLink, B as Box, I as IconButton, v as default_1$4, w as default_1$5, x as LinearProgress, y as makeStyles$1, z as CardActions, A as Button, D as useHistory, E as useDebounce, F as TextField, H as default_1$6, J as default_1$7, K as signInWithPopup, N as signInAnonymously, O as signOut, Q as default_1$8, S as default_1$9, U as bundle, V as default_1$a, W as default_1$b, X as default_1$c, Y as default_1$d, Z as default_1$e, _ as default_1$f, $ as Slider, a0 as get, a1 as Switch, a2 as Route, a3 as Fade, a4 as createTheme, a5 as default_1$g, a6 as default_1$h, a7 as QueryClient, a8 as ReactDOM, a9 as BrowserRouter, aa as QueryClientProvider, ab as ThemeProvider } from "./vendor.4ce5159d.js";
const apiKey = "AIzaSyCFeT-GJW_TNkH3GRkEchgBSSxd8IxWq-8";
const authDomain = "podcaster-ca277.firebaseapp.com";
const databaseURL = "https://podcaster-ca277-default-rtdb.firebaseio.com/";
const projectId = "podcaster-ca277";
const storageBucket = "podcaster-ca277.appspot.com";
const messagingSenderId = "1060072167958";
const appId = "1:1060072167958:web:b8071b3de130430422f337";
const measurementId = "G-NHG3XF04JF";
function getFirebaseConfig() {
  {
    const options = {
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId
    };
    return options;
  }
}
const firebaseConfig = getFirebaseConfig();
if (firebaseConfig === void 0)
  throw new Error("Invalid firebase config.");
initializeApp(firebaseConfig);
const Providers = {
  google: new GoogleAuthProvider()
};
const auth = getAuth();
const database = getDatabase();
const VITE_API_KEY = "RBE7535YHVY2VFHJPUDJ";
const VITE_API_SECRET = "DZmpt7J^vKzbeNwd4EvQUtGQj7wwd6Eq#vwChUL4";
const client = new PodcastIndexClient_1(VITE_API_KEY, VITE_API_SECRET);
const PodcastIndexContext = React.createContext(void 0);
function PodcastIndexProvider({ children }) {
  const value = {
    client
  };
  return /* @__PURE__ */ React.createElement(PodcastIndexContext.Provider, {
    value
  }, children);
}
function usePodcastIndex() {
  const context = React.useContext(PodcastIndexContext);
  if (context === void 0) {
    throw new Error("usePodcastIndex must be used within a PodcastIndexProvider");
  }
  return context;
}
const useStyles$8 = makeStyles({
  blackText: {
    color: "black"
  }
});
function Sidebar() {
  const classes = useStyles$8();
  const location = useLocation();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(List, {
    component: "nav",
    "aria-label": "home search subscriptions settings"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    component: Link,
    to: "/",
    selected: location.pathname === "/",
    className: classes.blackText
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(default_1, {
    color: "primary"
  })), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Home"
  })), /* @__PURE__ */ React.createElement(ListItem, {
    component: Link,
    to: "/search",
    selected: location.pathname.includes("/search"),
    className: classes.blackText
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(default_1$1, {
    color: "primary"
  })), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Search"
  })), /* @__PURE__ */ React.createElement(ListItem, {
    component: Link,
    to: "/subscriptions",
    selected: location.pathname === "/subscriptions",
    className: classes.blackText
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(default_1$2, {
    color: "primary"
  })), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Subscriptions"
  })), /* @__PURE__ */ React.createElement(ListItem, {
    component: Link,
    to: "/settings",
    selected: location.pathname === "/settings",
    className: classes.blackText
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(default_1$3, {
    color: "primary"
  })), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "Settings"
  }))));
}
var Sidebar$1 = React.memo(Sidebar);
function useQueriesTyped(queries) {
  return useQueries(queries);
}
function getImage(artworkURI, imageURI) {
  if (imageURI !== "" && imageURI !== null) {
    return imageURI;
  }
  return artworkURI;
}
function getEpisodeAuthor(subscriptions, feedId) {
  const subscription = subscriptions.find((subscription2) => subscription2.id === feedId);
  if (subscription)
    return subscription.author;
  return "";
}
function convertSecondsToTime(seconds) {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substr(11, 8);
  if (timeString.substr(0, 2) === "00") {
    return timeString.substr(3);
  }
  return timeString;
}
function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: [...value]
    };
  } else {
    return value;
  }
}
function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}
function isSubscription(data) {
  return data !== void 0;
}
function isValidMap(data) {
  return data !== null;
}
function isPlayback(data) {
  try {
    const parsed = JSON.parse(data, reviver);
    if (!isValidMap(parsed)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}
function isActiveEpisode(data) {
  return data.id !== void 0;
}
function isControls(data) {
  return data !== void 0;
}
function updateControlsDatabase(newControls, currentUser) {
  if (currentUser !== null) {
    const controlsRef = ref(database, `users/${currentUser.uid}/controls`);
    set(controlsRef, newControls);
  }
  localStorage.setItem("controls", JSON.stringify(newControls));
}
function updatePlaybackDatabase(newPlaybackStates, currentUser) {
  if (currentUser !== null) {
    const playbackRef = ref(database, `users/${currentUser.uid}/playback`);
    set(playbackRef, JSON.stringify(newPlaybackStates, replacer));
  }
  localStorage.setItem("playback", JSON.stringify(newPlaybackStates, replacer));
}
function updateSubscriptionsDatabase(newSubscriptions, currentUser) {
  if (currentUser !== null) {
    const subscriptionsRef = ref(database, `users/${currentUser.uid}/subscriptions`);
    set(subscriptionsRef, newSubscriptions);
  }
  localStorage.setItem("subscriptions", JSON.stringify(newSubscriptions));
}
function updateActiveEpisodeDatabase(newActiveEpisode, currentUser) {
  if (currentUser !== null) {
    const activeEpisodeRef = ref(database, `users/${currentUser.uid}/activeEpisode`);
    set(activeEpisodeRef, newActiveEpisode);
  }
  localStorage.setItem("activeEpisode", JSON.stringify(newActiveEpisode));
}
const useStyles$7 = makeStyles({
  endItems: {
    display: "flex",
    justifyContent: "flex-end",
    columnGap: "24px"
  },
  rounded: {
    borderRadius: "8px"
  },
  play: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    "-webkit-box-orient": "vertical",
    overflow: "hidden"
  }
});
function getCurrentPlayback(playbackStates, episodeID, duration) {
  if (playbackStates !== void 0 && playbackStates instanceof Map && playbackStates.has(episodeID)) {
    const time = playbackStates.get(episodeID) || 0;
    return Math.round(time / duration * 100);
  }
  return 0;
}
function getDescriptionHTML(html) {
  return document.createRange().createContextualFragment(html);
}
function Episode({
  episodeId,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates
}) {
  async function onPressButton() {
    if (data !== void 0) {
      if (episode !== void 0) {
        setActiveEpisode(episode);
        updateActiveEpisodeDatabase(episode, auth.currentUser);
      }
      setIsPlaying(!isPlaying);
    }
  }
  const classes = useStyles$7();
  const location = useLocation();
  const params = useParams();
  const { client: client2 } = usePodcastIndex();
  const [episodeIdState, setEpisodeIdState] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(null);
  async function fetchEpisode() {
    if (episodeIdState !== null) {
      const resp = await client2.episodeById(episodeIdState);
      return resp;
    }
  }
  const { data } = useQuery(`episodeById/${episodeIdState}`, fetchEpisode);
  const episode = data == null ? void 0 : data.episode;
  async function getEpisodeFromId() {
    if (episodeId !== void 0) {
      setEpisodeIdState(episodeId);
    } else if (params.episodeId !== void 0) {
      const episodeId2 = parseInt(params.episodeId);
      setEpisodeIdState(episodeId2);
    }
  }
  C__Users_Jason_Documents_podcaster_node_modules_react.exports.useEffect(() => {
    getEpisodeFromId();
  }, []);
  if (episode !== void 0) {
    const episodeDescriptionNode = getDescriptionHTML(episode.description);
    return /* @__PURE__ */ React.createElement(Card, {
      component: "article"
    }, /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(Grid, {
      container: true,
      spacing: 1,
      alignItems: "center",
      justifyContent: "space-between",
      wrap: "nowrap"
    }, /* @__PURE__ */ React.createElement(Grid, {
      item: true,
      xs: 9
    }, location.pathname.includes("episode") ? /* @__PURE__ */ React.createElement(C__Users_Jason_Documents_podcaster_node_modules_react.exports.Fragment, null, /* @__PURE__ */ React.createElement(Typography, {
      gutterBottom: true,
      variant: "subtitle2"
    }, episode.title), episodeDescriptionNode) : /* @__PURE__ */ React.createElement(C__Users_Jason_Documents_podcaster_node_modules_react.exports.Fragment, null, /* @__PURE__ */ React.createElement(MuiLink, {
      component: Link,
      gutterBottom: true,
      variant: "subtitle2",
      to: `/episode/${episode.id}`
    }, episode.title), /* @__PURE__ */ React.createElement(Typography, {
      variant: "body2",
      color: "textSecondary",
      component: "p",
      className: classes.text
    }, episodeDescriptionNode.textContent || ""))), /* @__PURE__ */ React.createElement(Grid, {
      item: true,
      xs: 3,
      className: classes.endItems
    }, /* @__PURE__ */ React.createElement(C__Users_Jason_Documents_podcaster_node_modules_react.exports.Fragment, null, /* @__PURE__ */ React.createElement(Box, {
      className: classes.play
    }, /* @__PURE__ */ React.createElement(Typography, {
      variant: "body2",
      color: "textSecondary",
      component: "p"
    }, new Date(episode.datePublished * 1e3).toLocaleDateString()), /* @__PURE__ */ React.createElement("img", {
      src: getImage(episode.image, episode.feedImage),
      height: "48px",
      width: "auto",
      className: classes.rounded
    })), /* @__PURE__ */ React.createElement(Box, {
      className: classes.play
    }, /* @__PURE__ */ React.createElement(Typography, {
      variant: "body2",
      color: "textSecondary",
      component: "p"
    }, `${Math.round(episode.duration / 60)} mins`), /* @__PURE__ */ React.createElement(IconButton, {
      onClick: onPressButton,
      color: "secondary"
    }, isPlaying && (activeEpisode == null ? void 0 : activeEpisode.id) === episode.id ? /* @__PURE__ */ React.createElement(default_1$4, {
      fontSize: "large"
    }) : /* @__PURE__ */ React.createElement(default_1$5, {
      fontSize: "large"
    }))))))), /* @__PURE__ */ React.createElement(LinearProgress, {
      variant: "determinate",
      value: getCurrentPlayback(playbackStates, episode.id, episode.duration)
    }));
  }
  return null;
}
function Feeds({
  episodes,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates
}) {
  return /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 3,
    direction: "column",
    alignItems: "stretch"
  }, episodes.map((episode) => /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: true,
    key: episode.id
  }, /* @__PURE__ */ React.createElement(Episode, {
    episodeId: episode.id,
    playbackStates,
    setIsPlaying,
    isPlaying,
    activeEpisode,
    setActiveEpisode
  }))));
}
var Feeds$1 = React.memo(Feeds);
const useStyles$6 = makeStyles$1({
  container: {
    display: "grid",
    gridTemplateColumns: "minmax(600px, 3fr) minmax(88px, 96px)",
    gridTemplateRows: "1fr",
    gap: "0px 24px",
    gridAutoFlow: "row",
    gridTemplateAreas: '"content icon"',
    alignItems: "center"
  },
  podcast: { marginBottom: "48px" },
  content: { gridArea: "content" },
  icon: {
    gridArea: "icon",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  rounded: {
    borderRadius: "8px"
  }
});
function Podcast({
  podcastId,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
  subscriptions,
  setSubscriptions
}) {
  const classes = useStyles$6();
  const { client: client2 } = usePodcastIndex();
  const params = useParams();
  const location = useLocation();
  const [podcastIdState, setPodcastIdState] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(void 0);
  const [feedId, setFeedId] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(void 0);
  const fetchedPodcast = useQuery(`podcastById/${podcastIdState}`, getPodcastFromId);
  const podcast = fetchedPodcast == null ? void 0 : fetchedPodcast.data;
  const fetchedFeed = useQuery(`episodesByFeedId/${feedId}`, getFeedFromPodcastId);
  const feed = fetchedFeed == null ? void 0 : fetchedFeed.data;
  async function getPodcastFromId() {
    if (podcastIdState !== void 0) {
      const podcast2 = await client2.podcastById(podcastIdState);
      setFeedId(podcast2.feed.id);
      return podcast2.feed;
    }
  }
  async function getFeedFromPodcastId() {
    if (feedId !== void 0 && podcast !== void 0) {
      const episodes = await client2.episodesByFeedId(feedId);
      return episodes.items;
    }
  }
  async function getPodcastId() {
    if (podcastId !== void 0) {
      setPodcastIdState(podcastId);
    }
    if (params.podcastId !== void 0) {
      setPodcastIdState(parseInt(params.podcastId));
    }
  }
  C__Users_Jason_Documents_podcaster_node_modules_react.exports.useEffect(() => {
    getPodcastId();
  }, []);
  function isSubscribed() {
    return podcast !== void 0 && subscriptions.map((sub) => sub.id).includes(podcast.id);
  }
  async function onPressButton() {
    isSubscribed() ? unsubscribe() : subscribe();
  }
  async function subscribe() {
    if (podcast !== void 0) {
      const newSubscription = await client2.podcastById(podcast.id);
      const newSubscriptions = [...subscriptions, newSubscription.feed];
      setSubscriptions(newSubscriptions);
      updateSubscriptionsDatabase(newSubscriptions, auth.currentUser);
    }
  }
  async function unsubscribe() {
    if (podcast !== void 0) {
      const newSubscriptions = subscriptions.filter((subscription) => {
        return subscription.id !== podcast.id;
      });
      setSubscriptions(newSubscriptions);
      updateSubscriptionsDatabase(newSubscriptions, auth.currentUser);
    }
  }
  return /* @__PURE__ */ React.createElement(C__Users_Jason_Documents_podcaster_node_modules_react.exports.Fragment, null, podcast !== void 0 ? /* @__PURE__ */ React.createElement(Card, {
    component: "article",
    className: location.pathname.includes("podcast") ? classes.podcast : ""
  }, /* @__PURE__ */ React.createElement(CardContent, {
    className: classes.container
  }, /* @__PURE__ */ React.createElement(C__Users_Jason_Documents_podcaster_node_modules_react.exports.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: classes.content
  }, location.pathname.includes("podcast") ? /* @__PURE__ */ React.createElement(Typography, {
    variant: "h5",
    component: "h5",
    gutterBottom: true
  }, podcast.title) : /* @__PURE__ */ React.createElement(MuiLink, {
    component: Link,
    gutterBottom: true,
    variant: "h5",
    to: `/podcast/${podcast.id}`
  }, podcast.title), /* @__PURE__ */ React.createElement(Typography, {
    variant: "body2",
    color: "textSecondary",
    component: "p"
  }, podcast.description)), /* @__PURE__ */ React.createElement("div", {
    className: classes.icon
  }, /* @__PURE__ */ React.createElement("img", {
    className: classes.rounded,
    src: getImage(podcast.artwork, podcast.image),
    height: "80px",
    width: "auto"
  })))), /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Button, {
    size: "small",
    color: "primary",
    onClick: onPressButton
  }, isSubscribed() ? "Unsubscribe" : "Subscribe"))) : null, feed !== void 0 && location.pathname.includes("podcast") ? /* @__PURE__ */ React.createElement(C__Users_Jason_Documents_podcaster_node_modules_react.exports.Fragment, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h6",
    component: "h6"
  }, "Episodes"), /* @__PURE__ */ React.createElement(Feeds$1, {
    episodes: feed,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  })) : null);
}
var Podcast$1 = React.memo(Podcast);
const useStyles$5 = makeStyles({
  search: { width: "75%" }
});
function Search({
  subscriptions,
  setSubscriptions,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates
}) {
  const classes = useStyles$5();
  const history = useHistory();
  const params = useParams();
  const { client: client2 } = usePodcastIndex();
  const [searchQueryText, setSearchQueryText] = useDebounce("", 500);
  const [searchText, setSearchText] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState("");
  C__Users_Jason_Documents_podcaster_node_modules_react.exports.useEffect(() => {
    if (params.term !== void 0) {
      if (params.term !== "" && params.term !== searchText) {
        const initialText = params.term;
        setSearchText(initialText);
        setSearchQueryText(initialText);
      }
    }
  }, []);
  const fetchedPodcast = useQuery(`search/${searchQueryText}`, getSearchResultsFromText);
  const searchResults = fetchedPodcast == null ? void 0 : fetchedPodcast.data;
  async function getSearchResultsFromText() {
    if (searchQueryText !== "") {
      history.push(`/search/${searchQueryText}`);
      const searchResults2 = await client2.search(searchQueryText);
      return searchResults2.feeds;
    }
  }
  const handleChange = (event) => {
    setSearchText(event.target.value);
    setSearchQueryText(event.target.value);
  };
  const runQuery = () => {
    setSearchQueryText(searchText);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Box, {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px"
  }, /* @__PURE__ */ React.createElement(TextField, {
    id: "standard-search",
    label: "Search",
    type: "search",
    value: searchText,
    onChange: handleChange,
    className: classes.search
  }), /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "primary",
    startIcon: /* @__PURE__ */ React.createElement(default_1$1, null),
    onClick: runQuery
  }, "Search")), /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 3,
    direction: "column",
    alignItems: "stretch"
  }, searchResults !== void 0 && searchResults.map((podcast) => /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    key: podcast.id,
    component: "article"
  }, /* @__PURE__ */ React.createElement(Podcast$1, {
    podcastId: podcast.id,
    subscriptions,
    setSubscriptions,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  })))));
}
var Search$1 = React.memo(Search);
function Subscriptions({
  subscriptions,
  setSubscriptions,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates
}) {
  return /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 3,
    direction: "column",
    alignItems: "stretch"
  }, subscriptions.map((podcast) => /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    key: podcast.id
  }, /* @__PURE__ */ React.createElement(Podcast$1, {
    podcastId: podcast.id,
    subscriptions,
    setSubscriptions,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  }))));
}
var Subscriptions$1 = React.memo(Subscriptions);
function GoogleLogo({
  disabled
}) {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      marginRight: 8,
      background: !disabled ? "#eee" : "#fff",
      padding: 8,
      borderRadius: 2,
      display: "flex",
      alignItems: "center"
    }
  }, /* @__PURE__ */ React.createElement("svg", {
    width: "18",
    height: "18",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("g", {
    fill: "#000",
    fillRule: "evenodd"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z",
    fill: "#EA4335"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z",
    fill: "#4285F4"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z",
    fill: "#FBBC05"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z",
    fill: "#34A853"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: "none",
    d: "M0 0h18v18H0z"
  }))));
}
const useStyles$4 = makeStyles((theme2) => ({
  googleButton: {
    color: "#fff",
    padding: "8px",
    backgroundColor: "#3367D6",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#1b53e2"
    }
  },
  defaultButton: {
    padding: "8px",
    textTransform: "none"
  },
  textStyle: {
    paddingRight: 10,
    fontWeight: 500,
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  }
}));
function Login() {
  const classes = useStyles$4();
  const history = useHistory();
  const [authenticating, setAuthenticating] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(false);
  function signInWithSocialMedia(provider) {
    setAuthenticating(true);
    signInWithPopup(auth, provider).then((result) => {
      history.push("/");
    }).catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
    setAuthenticating(false);
  }
  function continueAsGuest() {
    setAuthenticating(true);
    signInAnonymously(auth).then((result) => {
      history.push("/");
    }).catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
    setAuthenticating(false);
  }
  function logout() {
    signOut(auth);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Welcome to Podcaster"), auth.currentUser === null ? /* @__PURE__ */ React.createElement("p", null, "Please sign in to sync your data to your account.") : /* @__PURE__ */ React.createElement("p", null, "Your data is being synced to your account."), /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    direction: "column",
    spacing: 2,
    alignItems: "stretch"
  }, auth.currentUser === null ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "secondary",
    disabled: authenticating,
    onClick: () => signInWithSocialMedia(Providers.google),
    className: classes.googleButton,
    startIcon: /* @__PURE__ */ React.createElement(GoogleLogo, {
      disabled: authenticating
    })
  }, "Sign in with Google")), /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "secondary",
    disabled: authenticating,
    onClick: () => continueAsGuest(),
    className: classes.defaultButton,
    startIcon: /* @__PURE__ */ React.createElement("div", {
      style: {
        marginRight: 8,
        padding: 5,
        borderRadius: 2,
        display: "flex",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(default_1$6, null))
  }, "Sign in anonymously"))) : /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "primary",
    disabled: authenticating,
    onClick: () => logout(),
    className: classes.defaultButton,
    startIcon: /* @__PURE__ */ React.createElement("div", {
      style: {
        marginRight: 8,
        padding: 5,
        borderRadius: 2,
        display: "flex",
        alignItems: "center"
      }
    }, /* @__PURE__ */ React.createElement(default_1$7, null))
  }, "Log out"))));
}
const useStyles$3 = makeStyles((theme2) => ({
  rounded: {
    borderRadius: "8px"
  },
  title: {
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    overflow: "hidden"
  },
  author: {
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    overflow: "hidden"
  }
}));
function AlbumArt({
  activeEpisode,
  subscriptions
}) {
  const classes = useStyles$3();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, activeEpisode !== void 0 ? /* @__PURE__ */ React.createElement("img", {
    src: getImage(activeEpisode.image, activeEpisode.feedImage),
    height: "56px",
    width: "auto",
    className: classes.rounded
  }) : /* @__PURE__ */ React.createElement("img", {
    height: "56px",
    width: "56px",
    className: classes.rounded
  }), /* @__PURE__ */ React.createElement(Box, {
    paddingLeft: "16px"
  }, /* @__PURE__ */ React.createElement(Typography, {
    gutterBottom: true,
    variant: "subtitle2",
    component: "h6",
    className: classes.title
  }, activeEpisode !== void 0 ? activeEpisode.title : ""), /* @__PURE__ */ React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary",
    component: "p",
    className: classes.author
  }, activeEpisode !== void 0 ? getEpisodeAuthor(subscriptions, activeEpisode.feedId) : "")));
}
function Header() {
  const history = useHistory();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IconButton, {
    onClick: () => history.goBack()
  }, /* @__PURE__ */ React.createElement(default_1$8, null)), /* @__PURE__ */ React.createElement(IconButton, {
    onClick: () => history.goForward()
  }, /* @__PURE__ */ React.createElement(default_1$9, null)));
}
var catIcon = "/podcaster/assets/cat.bd0d0283.svg";
const useStyles$2 = makeStyles((theme2) => ({
  button: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1
  },
  headerText: {
    paddingLeft: "8px"
  }
}));
function Logo() {
  const classes = useStyles$2();
  return /* @__PURE__ */ React.createElement(Button, {
    color: "primary",
    className: classes.button,
    component: Link,
    to: "/"
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h6",
    component: "h1",
    className: classes.headerText
  }, "podcaster"), /* @__PURE__ */ React.createElement("img", {
    src: catIcon,
    height: "24px",
    width: "auto",
    alt: "cat"
  }));
}
const LISTEN_INTERVAL = 1e3;
function Player({
  playerRef,
  controls,
  src,
  onTickedCallback
}) {
  return /* @__PURE__ */ React.createElement(bundle, {
    ref: playerRef,
    autoPlay: false,
    muted: controls.isMuted,
    volume: controls.volume,
    src,
    loop: controls.isRepeat,
    listenInterval: LISTEN_INTERVAL,
    onListen: onTickedCallback
  });
}
const useStyles$1 = makeStyles((theme2) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 9fr) minmax(0, 2fr)",
    gridTemplateRows: "minmax(0, 2fr) minmax(0, 1fr)",
    gap: "0px 8px",
    gridAutoFlow: "row",
    gridTemplateAreas: '"playback volume" "time volume"',
    height: "100%"
  },
  playback: {
    gridArea: "playback",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 80px"
  },
  volume: {
    gridArea: "volume",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  time: {
    gridArea: "time",
    alignItems: "center",
    margin: "0px 80px",
    display: "flex"
  },
  playbackTimer: { marginInline: "24px" },
  muteButton: { marginRight: "16px" }
}));
function Footer({
  playbackStates,
  setPlaybackStates,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  episodes
}) {
  const classes = useStyles$1();
  const playerRef = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useRef(null);
  function getAudioElement() {
    var _a;
    if (playerRef !== null && playerRef.current !== null) {
      const audioElement = (_a = playerRef.current) == null ? void 0 : _a.audioEl.current;
      if (audioElement !== null) {
        return audioElement;
      }
    }
  }
  C__Users_Jason_Documents_podcaster_node_modules_react.exports.useEffect(() => {
    const audioElement = getAudioElement();
    if (audioElement !== void 0) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);
  const [controls, setControls] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState({
    isMuted: false,
    isShuffle: false,
    isRepeat: false,
    volume: 0.15
  });
  async function loadPlaybackStateFromDatabase(user) {
    const playbackRef = ref(database, `users/${user.uid}/playback`);
    get(playbackRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (isPlayback(data)) {
          const playback = JSON.parse(data, reviver);
          setPlaybackStates(playback);
        }
      }
    });
  }
  async function loadControlsStateFromDatabase(user) {
    const controlsRef = ref(database, `users/${user.uid}/controls`);
    get(controlsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (isControls(data)) {
          const controls2 = data;
          setControls(controls2);
        }
      }
    });
  }
  async function loadPlaybackStateFromLocal() {
    const data = localStorage.getItem("playback");
    if (data !== null && isPlayback(data)) {
      const playback = JSON.parse(data, reviver);
      setPlaybackStates(playback);
    }
  }
  async function loadControlsStateFromLocal() {
    const data = localStorage.getItem("controls");
    if (data !== null && isControls(JSON.parse(data))) {
      const controls2 = JSON.parse(data);
      setControls(controls2);
    }
  }
  C__Users_Jason_Documents_podcaster_node_modules_react.exports.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        loadPlaybackStateFromDatabase(user);
        loadControlsStateFromDatabase(user);
      } else {
        loadPlaybackStateFromLocal();
        loadControlsStateFromLocal();
      }
    });
  }, []);
  C__Users_Jason_Documents_podcaster_node_modules_react.exports.useEffect(() => {
    if (isPlaybackStored()) {
      const audioElement = getAudioElement();
      if (audioElement !== void 0) {
        audioElement.currentTime = getCurrentPlayback2();
      }
    }
  }, [activeEpisode]);
  const [isSeeking, setIsSeeking] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(false);
  function isPlaybackStored() {
    return activeEpisode !== void 0 && playbackStates.has(activeEpisode.id);
  }
  function getCurrentPlayback2() {
    if (isPlaybackStored() && activeEpisode !== void 0) {
      const playback = playbackStates.get(activeEpisode.id);
      if (playback !== void 0) {
        return playback;
      }
    }
    return 0;
  }
  function handleProgress(newTime) {
    if (!isSeeking) {
      updatePlaybackStates(newTime);
    }
  }
  const debouncedPlaybackStates = useDebounce(playbackStates, 10 * 1e3);
  C__Users_Jason_Documents_podcaster_node_modules_react.exports.useEffect(() => {
    updatePlaybackDatabase(playbackStates, auth.currentUser);
  }, [debouncedPlaybackStates]);
  function updatePlaybackStates(newValue) {
    if (activeEpisode !== void 0) {
      if (playbackStates instanceof Map && activeEpisode !== void 0) {
        const newPlaybackStates = new Map(playbackStates);
        newPlaybackStates.set(activeEpisode.id, newValue);
        setPlaybackStates(newPlaybackStates);
      } else {
        const newPlaybackStates = new Map([
          [activeEpisode.id, newValue]
        ]);
        setPlaybackStates(newPlaybackStates);
      }
    }
  }
  function handleVolumeChange(newValue) {
    if (typeof newValue === "number") {
      const newControls = __spreadProps(__spreadValues({}, controls), { volume: newValue });
      setControls(newControls);
      updateControlsDatabase(newControls, auth.currentUser);
    }
  }
  function handleMuteChange() {
    const newControls = __spreadProps(__spreadValues({}, controls), { isMuted: !controls.isMuted });
    setControls(newControls);
    updateControlsDatabase(newControls, auth.currentUser);
  }
  function handleRepeatChange() {
    const newControls = __spreadProps(__spreadValues({}, controls), { isRepeat: !controls.isRepeat });
    setControls(newControls);
    updateControlsDatabase(newControls, auth.currentUser);
  }
  function handleShuffleChange() {
    const newControls = __spreadProps(__spreadValues({}, controls), { isShuffle: !controls.isShuffle });
    setControls(newControls);
    updateControlsDatabase(newControls, auth.currentUser);
  }
  function handleSeekChange(newValue) {
    const audioElement = getAudioElement();
    if (audioElement !== void 0 && typeof newValue === "number") {
      setIsSeeking(true);
      audioElement.currentTime = newValue;
      setIsSeeking(false);
      updatePlaybackStates(newValue);
    }
  }
  function getEpisodeIndexWithinFeed(episodeID) {
    const episodeIDs = episodes.map((episode) => episode.id);
    const isEpisodeID = (episode) => episode === episodeID;
    const index2 = episodeIDs.findIndex(isEpisodeID);
    return index2;
  }
  function handleNext(episodeID) {
    const index2 = getEpisodeIndexWithinFeed(episodeID);
    const newIndex = index2 < episodes.length ? index2 + 1 : episodes.length - 1;
    if (index2 !== newIndex) {
      if (episodes[newIndex] !== void 0) {
        const newEpisode = episodes[newIndex];
        setActiveEpisode(newEpisode);
        updateActiveEpisodeDatabase(newEpisode, auth.currentUser);
      }
    }
  }
  function handlePrevious(episodeID) {
    const index2 = getEpisodeIndexWithinFeed(episodeID);
    const newIndex = index2 > 0 ? index2 - 1 : 0;
    if (index2 !== newIndex) {
      if (episodes[newIndex] !== void 0) {
        const newEpisode = episodes[newIndex];
        setActiveEpisode(newEpisode);
        updateActiveEpisodeDatabase(newEpisode, auth.currentUser);
      }
    }
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.container
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.playback
  }, /* @__PURE__ */ React.createElement(IconButton, {
    onClick: handleShuffleChange
  }, /* @__PURE__ */ React.createElement(default_1$a, null)), /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": "play previous",
    onClick: () => activeEpisode !== void 0 ? handlePrevious(activeEpisode.id) : null
  }, /* @__PURE__ */ React.createElement(default_1$b, null)), /* @__PURE__ */ React.createElement(IconButton, {
    color: "secondary",
    "aria-label": isPlaying ? "pause" : "play",
    onClick: () => activeEpisode !== void 0 ? setIsPlaying(!isPlaying) : null
  }, isPlaying ? /* @__PURE__ */ React.createElement(default_1$4, {
    fontSize: "large"
  }) : /* @__PURE__ */ React.createElement(default_1$5, {
    fontSize: "large"
  })), /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": "play next",
    onClick: () => activeEpisode !== void 0 ? handleNext(activeEpisode.id) : null
  }, /* @__PURE__ */ React.createElement(default_1$c, null)), /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": controls.isRepeat ? "repeat" : "no repeat",
    onClick: handleRepeatChange
  }, /* @__PURE__ */ React.createElement(default_1$d, null))), /* @__PURE__ */ React.createElement("div", {
    className: classes.volume
  }, /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": controls.isMuted ? "unmute" : "mute",
    onClick: handleMuteChange,
    className: classes.muteButton
  }, controls.isMuted ? /* @__PURE__ */ React.createElement(default_1$e, null) : /* @__PURE__ */ React.createElement(default_1$f, null)), /* @__PURE__ */ React.createElement(Slider, {
    value: controls.volume,
    getAriaValueText: () => `volume is ${controls.volume * 100}%`,
    "aria-labelledby": "volume-slider",
    onChange: (e, newValue) => handleVolumeChange(newValue),
    min: 0,
    step: 0.01,
    max: 1
  })), /* @__PURE__ */ React.createElement("div", {
    className: classes.time
  }, /* @__PURE__ */ React.createElement(Player, {
    playerRef,
    controls,
    src: activeEpisode == null ? void 0 : activeEpisode.enclosureUrl,
    playing: isPlaying,
    onTickedCallback: handleProgress
  }), /* @__PURE__ */ React.createElement(Typography, {
    variant: "subtitle2",
    color: "textSecondary"
  }, convertSecondsToTime(getCurrentPlayback2())), /* @__PURE__ */ React.createElement(Slider, {
    color: "primary",
    className: classes.playbackTimer,
    value: getCurrentPlayback2(),
    getAriaValueText: () => activeEpisode !== void 0 ? `current time is ${getCurrentPlayback2()} seconds` : "",
    "aria-labelledby": "time-slider",
    onChange: (e, newValue) => handleSeekChange(newValue),
    min: 0,
    step: 1,
    max: activeEpisode !== void 0 ? activeEpisode.duration : 0
  }), /* @__PURE__ */ React.createElement(Typography, {
    variant: "subtitle2",
    color: "textSecondary"
  }, convertSecondsToTime(activeEpisode !== void 0 ? activeEpisode.duration : 0))));
}
const useStyles = makeStyles((theme2) => ({
  container: {
    backgroundColor: theme2.palette.primary.light,
    display: "grid",
    gridTemplateColumns: "minmax(208px, 256px) minmax(720px, 1fr)",
    gridTemplateRows: "minmax(24px, 48px) minmax(600px, 1fr) minmax(72px, 88px)",
    gridAutoFlow: "row",
    gridTemplateAreas: '"logo header header" "navigation content content" "art controls controls"',
    height: "100%"
  },
  logo: { gridArea: "logo", display: "flex" },
  header: {
    gridArea: "header",
    display: "flex",
    alignItems: "center",
    padding: "0px 24px"
  },
  navigation: { gridArea: "navigation" },
  content: {
    gridArea: "content",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "0px 24px"
  },
  controls: {
    gridArea: "controls",
    padding: "0px 24px",
    backgroundColor: theme2.palette.primary.contrastText
  },
  art: {
    gridArea: "art",
    paddingLeft: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme2.palette.primary.contrastText
  }
}));
function App() {
  const classes = useStyles();
  const location = useLocation();
  const { client: client2 } = usePodcastIndex();
  const [loading, setLoading] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(true);
  const [subscriptions, setSubscriptions] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState([]);
  const [playbackStates, setPlaybackStates] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(new Map());
  const [activeEpisode, setActiveEpisode] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(void 0);
  const [isPlaying, setIsPlaying] = C__Users_Jason_Documents_podcaster_node_modules_react.exports.useState(false);
  async function getFeedEpisodes(feedId) {
    const subscriptionEpisodes = await client2.episodesByFeedId(feedId, {
      max: 10,
      fulltext: true
    });
    return subscriptionEpisodes.items;
  }
  const userQueries = useQueriesTyped(subscriptions.map((sub) => {
    return {
      queryKey: ["episodesByFeedId", sub.id],
      queryFn: () => getFeedEpisodes(sub.id)
    };
  }));
  const episodes = userQueries.flatMap((feedQuery) => feedQuery.isSuccess && feedQuery.data !== void 0 ? feedQuery.data : []);
  const sortedEpisodes = episodes.flat().sort(function(a, b) {
    const dateA = a.datePublished;
    const dateB = b.datePublished;
    if (dateA === dateB)
      return 0;
    return dateA < dateB ? 1 : -1;
  });
  async function loadSubscriptionsStateFromDatabase(user) {
    try {
      const subscriptionsRef = ref(database, `users/${user.uid}/subscriptions`);
      const subscriptionsSnapshot = await get(subscriptionsRef);
      if (subscriptionsSnapshot.exists()) {
        const subscriptionsData = subscriptionsSnapshot.val();
        if (isSubscription(subscriptionsData)) {
          const subs = subscriptionsData;
          setSubscriptions(subs);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function loadActiveEpisodeStateFromDatabase(user) {
    try {
      const activeEpisodeRef = ref(database, `users/${user.uid}/activeEpisode`);
      const activeEpisodeSnapshot = await get(activeEpisodeRef);
      if (activeEpisodeSnapshot.exists()) {
        const activeEpisodeData = activeEpisodeSnapshot.val();
        if (isActiveEpisode(activeEpisodeData)) {
          const activeEpisode2 = activeEpisodeData;
          setActiveEpisode(activeEpisode2);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function loadSubscriptionsStateFromLocal() {
    const data = localStorage.getItem("subscriptions");
    if (data !== null && isSubscription(JSON.parse(data))) {
      const subs = JSON.parse(data);
      setSubscriptions(subs);
    }
  }
  async function loadActiveEpisodeStateFromLocal() {
    const data = localStorage.getItem("activeEpisode");
    if (data !== null && isActiveEpisode(JSON.parse(data))) {
      const activeEpisode2 = JSON.parse(data);
      setActiveEpisode(activeEpisode2);
    }
  }
  C__Users_Jason_Documents_podcaster_node_modules_react.exports.useEffect(() => {
    auth.onAuthStateChanged((user) => {
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
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.container
  }, /* @__PURE__ */ React.createElement("header", {
    className: classes.logo
  }, /* @__PURE__ */ React.createElement(Logo, null)), /* @__PURE__ */ React.createElement("header", {
    className: classes.header
  }, /* @__PURE__ */ React.createElement(Header, null)), /* @__PURE__ */ React.createElement("nav", {
    className: classes.navigation
  }, /* @__PURE__ */ React.createElement(Sidebar$1, null)), /* @__PURE__ */ React.createElement("main", {
    className: classes.content
  }, /* @__PURE__ */ React.createElement(Switch, {
    location
  }, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/"
  }, /* @__PURE__ */ React.createElement(Fade, null, /* @__PURE__ */ React.createElement(Feeds$1, {
    episodes: sortedEpisodes,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  }))), /* @__PURE__ */ React.createElement(Route, {
    path: "/search/:term"
  }, /* @__PURE__ */ React.createElement(Search$1, {
    subscriptions,
    setSubscriptions,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  })), /* @__PURE__ */ React.createElement(Route, {
    path: "/search/:term"
  }, /* @__PURE__ */ React.createElement(Search$1, {
    subscriptions,
    setSubscriptions,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  })), /* @__PURE__ */ React.createElement(Route, {
    path: "/search"
  }, /* @__PURE__ */ React.createElement(Search$1, {
    subscriptions,
    setSubscriptions,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  })), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/episode/:episodeId"
  }, /* @__PURE__ */ React.createElement(Episode, {
    episodeId: void 0,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  })), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/subscriptions"
  }, /* @__PURE__ */ React.createElement(Subscriptions$1, {
    subscriptions,
    setSubscriptions,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  })), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/settings"
  }, /* @__PURE__ */ React.createElement(Login, null)), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/podcast/:podcastId"
  }, /* @__PURE__ */ React.createElement(Podcast$1, {
    podcastId: void 0,
    subscriptions,
    setSubscriptions,
    playbackStates,
    activeEpisode,
    setActiveEpisode,
    isPlaying,
    setIsPlaying
  })))), /* @__PURE__ */ React.createElement("footer", {
    className: classes.controls
  }, activeEpisode !== void 0 ? /* @__PURE__ */ React.createElement(Footer, {
    episodes: sortedEpisodes,
    playbackStates,
    activeEpisode,
    isPlaying,
    setIsPlaying,
    setPlaybackStates,
    setActiveEpisode
  }) : null), /* @__PURE__ */ React.createElement("footer", {
    className: classes.art
  }, /* @__PURE__ */ React.createElement(AlbumArt, {
    activeEpisode,
    subscriptions
  })));
}
var _300 = "/* roboto-cyrillic-ext-300-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src: url('__VITE_ASSET__ba7394e2__') format('woff2'), url('__VITE_ASSET__cbf6cb24__') format('woff');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* roboto-cyrillic-300-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src: url('__VITE_ASSET__fb83389e__') format('woff2'), url('__VITE_ASSET__cbf6cb24__') format('woff');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* roboto-greek-ext-300-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src: url('data:font/woff2;base64,d09GMgABAAAAAAXkABIAAAAACkAAAAWGAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGiYbcBw2BmAANAhYCYM8EQwKg3yDWwsQABIUATYCJAMcBCAFgnwHIAyCOhvaCAAeB7mJ9UosGExx/ZTgecxZvi/L5kH2LDEmSwheKPKxp2pSBk7+fq29f+qI/0XVFzNppon0bvGm0y+RmE4jJIbKYb9a08iFkP0IRyj8J8JV6Bqz98Xg/ZeAx6fC1qlMFbACVFH11aJC2LqqGyKZroJnqF001QPshyEo8gGAcggOgiAoIAIiBBAgoAuxCEaMyi4G66XjA11gvXKA7QTrdQ1DPWCNAD4nrhNrlw/0gATaNBplyx6K0tXL1TjCKyX21M7+WqFpN4LZmZ19zpruZktvlA4Iwb7aDgKkwT9ivcwKBTQGh5g5MHpyXhrEN0y0D4nIwgr3agUx5AYA3c9GYij8MGgtl8JHkiEgRg0itec/5/2lH92NANCONiqpp5QLJtHDFk8xiXpS+QRKs4swqGMKc1Bmr6DYYpDrfhj0NoU2UupYYua8Uqiq0LkCbOdtHABDh/Ho56eMQs6n75L/42ZEXZPPX7jAx4h3TFPak1HqOxrlbcSz0Qct7zgVLZdRheVOaZrEydhlG/EouqqhGbXLpSaftHwj3TlGpqfaqWFGijFD0jZt6/KKisiOqEOxtpM0eumaILxG5YT/Oxrbe3x9y3VKeUE5HhpRY4aMSBsbGZqCD00h4aHOxiZZO+dU/sh0u+WJwbUdz1z2onROt84heYZ0kjATTo14yOZrkubpJ89DZz4L3DnxE2i5jCzO3JRZ5YoVbUi5pNgVNkOdZB/je48vKk9JJvxMxULgbdqNTBBi+4dF3k2tZS1OpqdehiBg6V0enJpRD9LO+tmUtjHN5/ZhfOquQnjrn07keZshv4MxlSlje5JrZqF95whrCASFh8rlKADABSAf8IGBAMs4jIKfY8MQKJ2jre5fUZgv8ovyJwt27W3rkKydp14ja/P3HnrroyD5wpLD73567uO3Z85YfCdI3lIceTs88661d66cVDAn5PWZU77ekDaPYZvHrOXzQOgWHRm54zfc+elNFpl/SmqsjZPeTz+ddJbrm3PWhV7+5NlucjOFyzOt1fueAvf7ti8++1O76MD67fTCy1+3C9PLXrv4+MBDZQ/0GP03dnMD2Ts3jYxrPm1xSidcEYwCXOxsC0AB2aO5djfblIk0RVpdBEYaw0seO+xfm2fCMDKFyq/GqOwHVRCIn/xJTvNQ93C263bZW8HgOxOR7rzzlMbkf3fpymn7BgNdKdkAQ2+IGvUFGGqaSgQDrxTzVs1vAG2qHuzSFaQDxjUN4oGAiMY2uoHeapuqjO1XSRaCBwKl+OUAAkS+o0E5lgMggGpezFtceHhhwYDfvSoPAB77qagTALwu0z79J/7/db/aGwTwUQAIuOuyEfi9/4mzI/1qCF2Wa51lGdfKL2CvYVrdwULbZI+isS4XUE4FQgSAfFCoLYgQwGMFfET7wALgPSpUUhtV5LOj1pqr1YjatGKp4MBz+9J8ZvDOcHrpY5wB2mmljSEogfgT0AcpafQKjC7Y5Ax6aMK3kMBily5UlgaZAut/hWWAEVia8aWQXhrpZYheKNkKa/XmVobpogFYGhxgkPZSzxnQdz2IMKJOdDosntnHGjcP0Uckfsaj3+dLA3000EQbLL70MkArfnTRThMsPQzCMogf2WSQRAq5FJGCz/7T/vCpzeXW0MylJvIytIcThWovXB7xHvGUF9nFw14HkvY8SXc6JbDuddudamZlfngOWyOLskLDenHZpMghO62fTCHF2d85L7K5dvUpXsGw4JYWKX5EZ2drjQ7W6jBmUnR5bOU47xNw+Sq3veEDvpEzxTKYmeIEhjKHYNPkcGZwNV9cCDoInQNDmcm0kS6gWygHDS0qGsZhBafAXtq5EYqy3oo/AhqGhjILE11AL1KuMHitkekcFzZC0lAbMggAAAA=') format('woff2'), url('__VITE_ASSET__cbf6cb24__') format('woff');\n  unicode-range: U+1F00-1FFF;\n}\n/* roboto-greek-300-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src: url('__VITE_ASSET__2bb7629c__') format('woff2'), url('__VITE_ASSET__cbf6cb24__') format('woff');\n  unicode-range: U+0370-03FF;\n}\n/* roboto-vietnamese-300-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src: url('__VITE_ASSET__2ab35825__') format('woff2'), url('__VITE_ASSET__cbf6cb24__') format('woff');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* roboto-latin-ext-300-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src: url('__VITE_ASSET__b448446e__') format('woff2'), url('__VITE_ASSET__cbf6cb24__') format('woff');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* roboto-latin-300-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 300;\n  src: url('__VITE_ASSET__33530b00__') format('woff2'), url('__VITE_ASSET__cbf6cb24__') format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n";
var _400 = "/* roboto-cyrillic-ext-400-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__78f525ec__') format('woff2'), url('__VITE_ASSET__55110586__') format('woff');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* roboto-cyrillic-400-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__8dd3b91c__') format('woff2'), url('__VITE_ASSET__55110586__') format('woff');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* roboto-greek-ext-400-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('data:font/woff2;base64,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') format('woff2'), url('__VITE_ASSET__55110586__') format('woff');\n  unicode-range: U+1F00-1FFF;\n}\n/* roboto-greek-400-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__ede055d1__') format('woff2'), url('__VITE_ASSET__55110586__') format('woff');\n  unicode-range: U+0370-03FF;\n}\n/* roboto-vietnamese-400-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__fb56f0e0__') format('woff2'), url('__VITE_ASSET__55110586__') format('woff');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* roboto-latin-ext-400-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__4e959d91__') format('woff2'), url('__VITE_ASSET__55110586__') format('woff');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* roboto-latin-400-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__cc46322d__') format('woff2'), url('__VITE_ASSET__55110586__') format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n";
var _500 = "/* roboto-cyrillic-ext-500-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src: url('__VITE_ASSET__c9295226__') format('woff2'), url('__VITE_ASSET__c93f4332__') format('woff');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* roboto-cyrillic-500-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src: url('__VITE_ASSET__2d2ad11e__') format('woff2'), url('__VITE_ASSET__c93f4332__') format('woff');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* roboto-greek-ext-500-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src: url('data:font/woff2;base64,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') format('woff2'), url('__VITE_ASSET__c93f4332__') format('woff');\n  unicode-range: U+1F00-1FFF;\n}\n/* roboto-greek-500-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src: url('__VITE_ASSET__d2ea238a__') format('woff2'), url('__VITE_ASSET__c93f4332__') format('woff');\n  unicode-range: U+0370-03FF;\n}\n/* roboto-vietnamese-500-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src: url('__VITE_ASSET__b03ef4b1__') format('woff2'), url('__VITE_ASSET__c93f4332__') format('woff');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* roboto-latin-ext-500-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src: url('__VITE_ASSET__b48f2e02__') format('woff2'), url('__VITE_ASSET__c93f4332__') format('woff');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* roboto-latin-500-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 500;\n  src: url('__VITE_ASSET__bb46ed07__') format('woff2'), url('__VITE_ASSET__c93f4332__') format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n";
var _700 = "/* roboto-cyrillic-ext-700-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src: url('__VITE_ASSET__790da48c__') format('woff2'), url('__VITE_ASSET__61e16263__') format('woff');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* roboto-cyrillic-700-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src: url('__VITE_ASSET__053508cc__') format('woff2'), url('__VITE_ASSET__61e16263__') format('woff');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* roboto-greek-ext-700-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src: url('data:font/woff2;base64,d09GMgABAAAAAAW8ABIAAAAACfAAAAVgAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGiYbcBw2BmAANAhICYM8EQwKg0iDLwsQABIUATYCJAMcBCAFgn4HIAyCKRuPCACO0xV3IEmKD1MGfZv+7N4dZolTWSBxtHXaOCSNORfxixipiD1xXe6p/5kLPAD3s7dInEbibDiu0u+LFIkG3BXo4Ykewu3+/3tV773Z+AO0NvhPwAIckfd+1steHWuDFDRGOaUxrRu7cZsWiKtuiGTtKvMfdZq+6gH27UBQFgAApCM0CIKgABPAhAAIwCColNisbuhA9nTnpllkLzcpM8jeDW+ZRzYRgPfJnq2yaR468FEiau46VCpRyuaWCGTJ2nlNia4ZuswKVY4qR5eTR3O6EL2RPgwJpKe0HCDF/g7hF+NhAK4ClsuxpWbSXANWbLQHafA/MJ64hIIhXwAgNiQOhhGmUcQjlYCQRAxFIKxWksnvf/bhAyAAoMhXuA7/o8lQKITb8AxexR4+QOprCKnhS8EiLhijYaRGT4ctxpEaz0Ra6AbY44/DEv8AFAAO74DrW2IJQs6Q7yfJozyyOKEXBgd8nHgZi05FOBnycerlpMjl44KXVXMht7ot5pHZKeyU2rFTWDWbHB7jYu7Bg1dSTpEDjKM9mGIcHYGLl8tOX6nIctjHxalUYuEUGVU2PYlqmqvLfz4ueev7C3ktsdYYPxBx8vKILHW5WJQ/3kLC48LlTPOaffJ+Z+9U5o5BW9AUaUY3i2g3Ua5jkB+nMEMeFz9gk85TPPId5PGe9xOcAeVDXMiNlvKBlqg40Ek5hd2sFGTno0/Ex/Xe+vZYNELoXfKUwcvdUQEjei5n8ibyyQl2SnvsgXKIRn90ONFRt8Id+XJBdnJPbBNnJ+63gVf+6ZDZy8s/Wxl6goQHkWwUPCJijwKC0qH/SVgBgBYAWAB6QClgikPT2F2QNCmaVxQFDNktGv3163Zbd+yenNbN9FmnyYxl94E3PzSc8vHbXeTgO5+c/tFbGNm/bjjl1Q4ceM146hvdu3uNiKXHjXits+P110nB05C+nxaUPkgJ+6Hoth+M2z+5WiD9J0i/0NL28X1vXFiVfed99zhvv7QSL21445Lq7DtmlfnHfT2Az6797qILr/0aH9d8cO1vzwuv/hYfb8g879L5da+kfVba52u/fQC7B6vbOmvdfSf6ncgjtgEt6e9hgAL+z0h+K22R3gBHNOA04EzQzFKZQOhh2quKFPbMWlWCWqvSzXHDu6qJVJsPojZueTcYUsWlzECspL64AJq0JhRRPISbbIlUwg3FMdebzl8Bosy5NRgCNwa49sUHu4AAGTLauHQUpUD4bIAATCmtCNC4qIW/LK06/rDkvz1oXf+bLksHAHj6R7sfAF4jba//HfzvNf1x3WYQehQAENDu/jcB+ofr/1/ZA0Tjp42chjEPJC9AuqArshS9sWf/zwABaJ2JdE2kfLA8gKJ1aBCAzjgBieoBDMDYTpgM2Cmdabsg3Sa5aJfkOWHXSHfHTS06PI0qcQt22mTKhElbMMsEhVoTUyPOY9Isxb3WvFH+QgUWZ/NtmenNzF9UbKbYZBvFGL82cSPitoirFDdrjM+zku7KHdpsCtLz+0D/4nKrrdvV/tX5Wl9kD8u3WBAWaFXb389v2IJhoyYp/OI2mRAwa8ooxbzNFJsFNKhVJapJuyjf6qNBghouOW3MLbmpmKOYSoy0GPeRUMHSdAt0tftoJOxljlFe4D3Es7f3hT0e0rah+lWLPTS5SzPtRg9t5aqiJQ4PXTjgzrR29au88DD01oeLstyM/zx31aboHqgmo7aY4927TQ1ayGaV2zrQYtyiHoCF4a1qWaqkBkH7IWDcojZTnM6kOykJSyNZtBW3chStmakiDk4po9QPgKWtLeqg0Jn0AiVTZb81BLJTcegDjPEtRjYDAA==') format('woff2'), url('__VITE_ASSET__61e16263__') format('woff');\n  unicode-range: U+1F00-1FFF;\n}\n/* roboto-greek-700-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src: url('__VITE_ASSET__6d6cdebe__') format('woff2'), url('__VITE_ASSET__61e16263__') format('woff');\n  unicode-range: U+0370-03FF;\n}\n/* roboto-vietnamese-700-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src: url('__VITE_ASSET__6ac62ad1__') format('woff2'), url('__VITE_ASSET__61e16263__') format('woff');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* roboto-latin-ext-700-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src: url('__VITE_ASSET__336bb304__') format('woff2'), url('__VITE_ASSET__61e16263__') format('woff');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* roboto-latin-700-normal*/\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 700;\n  src: url('__VITE_ASSET__0eaeadb5__') format('woff2'), url('__VITE_ASSET__61e16263__') format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n";
var index = 'body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nhtml,\nbody,\n#root {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.fade-enter {\n  opacity: 0;\n  z-index: 1;\n}\n\n.fade-enter.fade-enter-active {\n  opacity: 1;\n  transition: opacity 250ms ease-in;\n}\n';
const theme = createTheme({
  palette: {
    primary: {
      contrastText: default_1$g[100],
      dark: default_1$g[900],
      main: default_1$g[700],
      light: default_1$g[50]
    },
    secondary: {
      dark: default_1$h[900],
      main: default_1$h[800],
      light: default_1$h[100]
    },
    info: {
      main: default_1$g[100]
    }
  }
});
const queryClient = new QueryClient();
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(BrowserRouter, {
  basename: "/podcaster"
}, /* @__PURE__ */ React.createElement(QueryClientProvider, {
  client: queryClient
}, /* @__PURE__ */ React.createElement(PodcastIndexProvider, null, /* @__PURE__ */ React.createElement(ThemeProvider, {
  theme
}, /* @__PURE__ */ React.createElement(App, null)))))), document.getElementById("root"));
