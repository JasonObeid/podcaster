import BottomNavigation from "@material-ui/core/BottomNavigation";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import RepeatIcon from "@material-ui/icons/Repeat";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import blueGrey from "@material-ui/core/colors/blueGrey";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Types } from "podcastindexjs";
import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

type PlayerProps = {
  playbackStates: Map<number, number>;
  setPlaybackStates: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  activeEpisode: Types.PIApiEpisodeInfo | undefined;
  setActiveEpisode: React.Dispatch<
    React.SetStateAction<Types.PIApiEpisodeInfo | undefined>
  >;
  subscriptions: Types.PIApiPodcast[];
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  episodes: Types.PIApiEpisodeInfo[];
};

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
  time: { gridArea: "time", alignItems: "center", margin: "0px 80px" },
  muteButton: { marginRight: "16px" },
}));

export default function Player({
  playbackStates,
  setPlaybackStates,
  activeEpisode,
  setActiveEpisode,
  subscriptions,
  isPlaying,
  setIsPlaying,
  episodes,
}: PlayerProps) {
  const classes = useStyles();
  const player = useRef<ReactPlayer | null>(null);

  const timeRef = useRef<Map<number, number>>(playbackStates);
  timeRef.current = playbackStates;

  const activeRef = useRef<Types.PIApiEpisodeInfo | undefined>(activeEpisode);
  activeRef.current = activeEpisode;

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  //setIsMuted(response.isMuted);
  //setVolume(parseFloat(response.volume));
  function getCurrentPlayback() {
    if (activeEpisode !== null) {
      if (playbackStates instanceof Map) {
        if (activeEpisode?.id !== undefined) {
          if (playbackStates.has(activeEpisode?.id)) {
            return playbackStates.get(activeEpisode?.id);
          }
        }
      }
    }
    return 0;
  }

  const handleProgress = (state: any) => {
    // We only want to update time slider if we are not currently seeking
    if (!isSeeking && state.playedSeconds > 0) {
      updatePlaybackStates(state.playedSeconds);
    }
  };

  function updatePlaybackStates(newValue: number) {
    if (activeEpisode !== undefined) {
      if (playbackStates instanceof Map && activeEpisode !== undefined) {
        const newPlaybackStates = new Map<number, number>(playbackStates);
        newPlaybackStates.set(activeEpisode.id, newValue);
        console.log(newPlaybackStates);
        setPlaybackStates(newPlaybackStates);
      } else {
        const newPlaybackStates = new Map<number, number>([
          [activeEpisode.id, newValue],
        ]);
        setPlaybackStates(newPlaybackStates);
        console.log(newPlaybackStates);
      }
    }
  }

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setVolume(newValue);
    }
  };

  const handleMuteChange = (event: any) => {
    setIsMuted(!isMuted);
  };

  const handleSeekChange = (event: Event, newValue: number | number[]) => {
    if (
      player !== null &&
      player.current !== null &&
      typeof newValue === "number"
    ) {
      console.log(newValue);
      setIsSeeking(true);
      //@ ts-ignore
      player.current.seekTo(newValue, "seconds");
      setIsSeeking(false);
      //@ ts-ignore
      updatePlaybackStates(newValue);
    }
  };

  function getEpisodeIndexWithinFeed(episodeID: any) {
    const episodeIDs = episodes.map((episode: { id: any }) => episode.id);
    const isEpisodeID = (episode: any) => episode === episodeID;
    const index = episodeIDs.findIndex(isEpisodeID);
    console.log(index);
    return index;
  }

  const handlePrevious = (episodeID: any) => {
    const index = getEpisodeIndexWithinFeed(episodeID);
    const newIndex = index < episodes.length ? index + 1 : episodes.length - 1;
    console.log(newIndex);
    if (index !== newIndex) {
      console.log(episodes[newIndex]);
      setActiveEpisode(episodes[newIndex]);
    }
  };

  const handleNext = (episodeID: any) => {
    const index = getEpisodeIndexWithinFeed(episodeID);
    const newIndex = index > 0 ? index - 1 : 0;
    console.log(newIndex);
    if (index !== newIndex) {
      console.log(episodes[newIndex]);
      setActiveEpisode(episodes[newIndex]);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.playback}>
        <IconButton onClick={handleMuteChange}>
          {isMuted ? <ShuffleIcon /> : <ShuffleIcon />}
        </IconButton>
        <IconButton
          aria-label="play previous"
          onClick={() =>
            activeEpisode !== undefined
              ? handlePrevious(activeEpisode.id)
              : null
          }
        >
          <SkipPreviousIcon />
        </IconButton>
        <IconButton
          aria-label={isPlaying ? "pause" : "play"}
          onClick={() =>
            activeEpisode !== undefined ? setIsPlaying(!isPlaying) : null
          }
        >
          {isPlaying ? (
            <PauseCircleFilledIcon fontSize="large" />
          ) : (
            <PlayCircleFilledIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton
          aria-label="play next"
          onClick={() =>
            activeEpisode !== undefined ? handleNext(activeEpisode.id) : null
          }
        >
          <SkipNextIcon />
        </IconButton>
        <IconButton
          aria-label={isMuted ? "repeat" : "no repeat"}
          onClick={handleNext}
        >
          {isMuted ? <RepeatIcon /> : <RepeatIcon />}
        </IconButton>
      </div>
      <div className={classes.volume}>
        <IconButton
          aria-label={isMuted ? "unmute" : "mute"}
          onClick={handleMuteChange}
          className={classes.muteButton}
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
        <Slider
          value={volume}
          getAriaValueText={() => `volume is ${volume * 100}%`}
          aria-labelledby="volume-slider"
          onChange={handleVolumeChange}
          min={0}
          step={0.01}
          max={1}
        />
      </div>
      <div className={classes.time}>
        <ReactPlayer
          ref={player}
          url={
            activeEpisode !== undefined ? activeEpisode.enclosureUrl : undefined
          }
          playing={isPlaying}
          volume={volume}
          muted={isMuted}
          onProgress={handleProgress}
          width={0}
          height={0}
        />
        <Slider
          value={getCurrentPlayback()}
          getAriaValueText={() =>
            activeEpisode !== undefined
              ? `current time is ${playbackStates.get(
                  activeEpisode.id,
                )} seconds`
              : ""
          }
          aria-labelledby="time-slider"
          onChange={handleSeekChange}
          min={0}
          step={1}
          max={activeEpisode !== undefined ? activeEpisode.duration : 0}
        />
      </div>
    </div>
  );
}
