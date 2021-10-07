import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilledRounded";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhiteRounded";
import RepeatIcon from "@material-ui/icons/RepeatRounded";
import ShuffleIcon from "@material-ui/icons/ShuffleRounded";
import SkipNextIcon from "@material-ui/icons/SkipNextRounded";
import SkipPreviousIcon from "@material-ui/icons/SkipPreviousRounded";
import VolumeOffIcon from "@material-ui/icons/VolumeOffRounded";
import VolumeUpIcon from "@material-ui/icons/VolumeUpRounded";
import React, { useEffect, useRef, useState } from "react";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { auth, database, ref } from "../../config/firebase";
import { Controls, FooterProps } from "../../types/footer";
import { get } from "firebase/database";
import {
  updatePlaybackDatabase,
  updateControlsDatabase,
  updateActiveEpisodeDatabase,
} from "../../utils/databaseMutations";
import {
  convertSecondsToTime,
  isControls,
  isPlayback,
  reviver,
} from "../../utils/utils";
import { User } from "firebase/auth";
import Player from "./Player";
import Typography from "@material-ui/core/Typography";
import { useDebounce } from "@react-hook/debounce";
import ReactAudioPlayer from "./ReactAudioPlayer";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 9fr) minmax(0, 2fr)",
    gridTemplateRows: "minmax(0, 2fr) minmax(0, 1fr)",
    gap: "0px 8px",
    gridAutoFlow: "row",
    gridTemplateAreas: '"playback volume" "time volume"',
    height: "100%",
  },
  playback: {
    gridArea: "playback",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 80px",
  },
  volume: {
    gridArea: "volume",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    gridArea: "time",
    alignItems: "center",
    margin: "0px 80px",
    display: "flex",
    justifyContent: "center",
  },
  playbackTimer: { marginInline: "24px", width: "35vw" },
  muteButton: { marginRight: "16px" },
  muteButtonActive: {
    marginRight: "16px",
    backgroundColor: theme.palette.primary.light,
  },
  shuffleButtonActive: { backgroundColor: theme.palette.primary.light },
  repeatButtonActive: { backgroundColor: theme.palette.primary.light },
}));

export default function Footer({
  playbackStates,
  setPlaybackStates,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  episodes,
}: FooterProps) {
  const classes = useStyles();

  const playerRef = useRef<null | ReactAudioPlayer>(null);

  function getAudioElement() {
    if (playerRef !== null && playerRef.current !== null) {
      const audioElement: HTMLAudioElement | null =
        playerRef.current?.audioEl.current;

      if (audioElement !== null) {
        return audioElement;
      }
    }
  }

  useEffect(() => {
    const audioElement = getAudioElement();
    if (audioElement !== undefined) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);

  const [controls, setControls] = useState<Controls>({
    isMuted: false,
    isShuffle: false,
    isRepeat: false,
    volume: 0.15,
  });

  async function loadPlaybackStateFromDatabase(user: User) {
    const playbackRef = ref(database, `users/${user.uid}/playback`);
    get(playbackRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        if (isPlayback(data)) {
          const playback: Map<number, number> = JSON.parse(data, reviver);
          setPlaybackStates(playback);
        }
      }
    });
  }

  async function loadControlsStateFromDatabase(user: User) {
    const controlsRef = ref(database, `users/${user.uid}/controls`);
    get(controlsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        if (isControls(data)) {
          const controls: Controls = data;
          setControls(controls);
        }
      }
    });
  }

  async function loadPlaybackStateFromLocal() {
    const data = localStorage.getItem("playback");
    if (data !== null && isPlayback(data)) {
      const playback: Map<number, number> = JSON.parse(data, reviver);
      setPlaybackStates(playback);
    }
  }

  async function loadControlsStateFromLocal() {
    const data = localStorage.getItem("controls");
    if (data !== null && isControls(JSON.parse(data))) {
      const controls: Controls = JSON.parse(data);
      setControls(controls);
    }
  }

  useEffect(() => {
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

  useEffect(() => {
    if (isPlaybackStored()) {
      const audioElement = getAudioElement();
      if (audioElement !== undefined) {
        audioElement.currentTime = getCurrentPlayback();
      }
    }
  }, [activeEpisode]);

  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  function isPlaybackStored(): boolean {
    return activeEpisode !== undefined && playbackStates.has(activeEpisode.id);
  }

  function getCurrentPlayback(): number {
    if (isPlaybackStored() && activeEpisode !== undefined) {
      const playback = playbackStates.get(activeEpisode.id);
      if (playback !== undefined) {
        return playback;
      }
    }

    return 0;
  }

  function handleProgress(newTime: number) {
    // We only want to update time slider if we are not currently seeking
    if (!isSeeking) {
      updatePlaybackStates(newTime);
    }
  }

  const debouncedPlaybackStates = useDebounce(playbackStates, 10 * 1000);

  useEffect(() => {
    updatePlaybackDatabase(playbackStates, auth.currentUser);
  }, [debouncedPlaybackStates]);

  function updatePlaybackStates(newValue: number) {
    if (activeEpisode !== undefined) {
      if (playbackStates instanceof Map && activeEpisode !== undefined) {
        const newPlaybackStates = new Map<number, number>(playbackStates);
        newPlaybackStates.set(activeEpisode.id, newValue);
        setPlaybackStates(newPlaybackStates);
      } else {
        const newPlaybackStates = new Map<number, number>([
          [activeEpisode.id, newValue],
        ]);
        setPlaybackStates(newPlaybackStates);
      }
    }
  }

  function handleVolumeChange(newValue: number | number[]) {
    if (typeof newValue === "number") {
      const newControls = { ...controls, volume: newValue };
      setControls(newControls);
      updateControlsDatabase(newControls, auth.currentUser);
    }
  }

  function handleMuteChange() {
    const newControls = { ...controls, isMuted: !controls.isMuted };
    setControls(newControls);
    updateControlsDatabase(newControls, auth.currentUser);
  }

  function handleRepeatChange() {
    const newControls = { ...controls, isRepeat: !controls.isRepeat };
    setControls(newControls);
    updateControlsDatabase(newControls, auth.currentUser);
  }

  function handleShuffleChange() {
    const newControls = { ...controls, isShuffle: !controls.isShuffle };
    setControls(newControls);
    updateControlsDatabase(newControls, auth.currentUser);
  }

  function handleSeekChange(newValue: number | number[]) {
    const audioElement = getAudioElement();
    if (audioElement !== undefined && typeof newValue === "number") {
      setIsSeeking(true);
      audioElement.currentTime = newValue;
      setIsSeeking(false);
      updatePlaybackStates(newValue);
    }
  }

  function getEpisodeIndexWithinFeed(episodeID: number) {
    const episodeIDs = episodes.map((episode: { id: number }) => episode.id);
    const isEpisodeID = (episode: number) => episode === episodeID;
    const index = episodeIDs.findIndex(isEpisodeID);
    return index;
  }

  function getRandomItem(list: number[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function handleNext(episodeID: number) {
    const index = getEpisodeIndexWithinFeed(episodeID);
    if (controls.isShuffle) {
      const validIndices = episodes
        .map((_episode, episodeIndex) => episodeIndex)
        .filter((episodeIndex) => episodeIndex !== index);
      const newIndex = getRandomItem(validIndices);
      if (episodes[newIndex] !== undefined) {
        const newEpisode = episodes[newIndex];
        setActiveEpisode(newEpisode);
        updateActiveEpisodeDatabase(newEpisode, auth.currentUser);
      }
    } else {
      const newIndex =
        index < episodes.length ? index + 1 : episodes.length - 1;
      if (index !== newIndex) {
        if (episodes[newIndex] !== undefined) {
          const newEpisode = episodes[newIndex];
          setActiveEpisode(newEpisode);
          updateActiveEpisodeDatabase(newEpisode, auth.currentUser);
        }
      }
    }
  }

  function handlePrevious(episodeID: number) {
    const index = getEpisodeIndexWithinFeed(episodeID);
    const newIndex = index > 0 ? index - 1 : 0;
    if (index !== newIndex) {
      if (episodes[newIndex] !== undefined) {
        const newEpisode = episodes[newIndex];
        setActiveEpisode(newEpisode);
        updateActiveEpisodeDatabase(newEpisode, auth.currentUser);
      }
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.playback}>
        <IconButton
          onClick={handleShuffleChange}
          aria-label={controls.isShuffle ? "shuffle_off" : "shuffle"}
          className={
            controls.isShuffle ? classes.shuffleButtonActive : undefined
          }
        >
          <ShuffleIcon />
        </IconButton>
        <IconButton
          aria-label="play_previous"
          onClick={() =>
            activeEpisode !== undefined
              ? handlePrevious(activeEpisode.id)
              : null
          }
        >
          <SkipPreviousIcon />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label={isPlaying ? "pause" : "play"}
          onClick={() =>
            activeEpisode !== undefined ? setIsPlaying(!isPlaying) : null
          }
        >
          {isPlaying ? (
            <PauseCircleFilledIcon fontSize="large" />
          ) : (
            <PlayCircleFilledWhiteIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton
          aria-label="play_next"
          onClick={() =>
            activeEpisode !== undefined ? handleNext(activeEpisode.id) : null
          }
        >
          <SkipNextIcon />
        </IconButton>
        <IconButton
          aria-label={controls.isRepeat ? "no_repeat" : "repeat"}
          onClick={handleRepeatChange}
          className={controls.isRepeat ? classes.repeatButtonActive : undefined}
        >
          <RepeatIcon />
        </IconButton>
      </div>
      <div className={classes.volume}>
        <IconButton
          aria-label={controls.isMuted ? "unmute" : "mute"}
          onClick={handleMuteChange}
          className={
            controls.isMuted ? classes.muteButtonActive : classes.muteButton
          }
        >
          {controls.isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
        <Slider
          value={controls.volume}
          getAriaValueText={() => `volume_is_${controls.volume * 100}%`}
          aria-label="volume-slider"
          onChange={(e, newValue) => handleVolumeChange(newValue)}
          min={0}
          step={0.01}
          max={1}
        />
      </div>
      <div className={classes.time}>
        <Player
          playerRef={playerRef}
          controls={controls}
          src={activeEpisode?.enclosureUrl}
          playing={isPlaying}
          onTickedCallback={handleProgress}
        ></Player>
        <Typography
          component="label"
          variant="subtitle2"
          style={{ color: "hsl(0deg 0% 0% / 71%)" }}
        >
          {convertSecondsToTime(getCurrentPlayback())}
        </Typography>
        <Slider
          color="primary"
          className={classes.playbackTimer}
          value={getCurrentPlayback()}
          getAriaValueText={() =>
            activeEpisode !== undefined
              ? `current_time_is_${getCurrentPlayback()}_seconds`
              : ""
          }
          aria-label="time-slider"
          onChange={(e, newValue) => handleSeekChange(newValue)}
          min={0}
          step={1}
          max={activeEpisode !== undefined ? activeEpisode.duration : 0}
        />
        <Typography
          component="label"
          variant="subtitle2"
          style={{ color: "hsl(0deg 0% 0% / 71%)" }}
        >
          {convertSecondsToTime(
            activeEpisode !== undefined ? activeEpisode.duration : 0,
          )}
        </Typography>
      </div>
    </div>
  );
}
