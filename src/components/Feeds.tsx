import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";
import { Types } from "podcastindexjs";
import { usePodcastIndex } from "../context/PodcastIndexContext";

import Episode from "./Episode";

type FeedProps = {
  episodes: Types.PIApiEpisodeInfo[];
  activeEpisode: Types.PIApiEpisodeInfo | undefined;
  setActiveEpisode: React.Dispatch<
    React.SetStateAction<Types.PIApiEpisodeInfo | undefined>
  >;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playbackStates: Map<number, number>;
};

function Feeds({
  episodes,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
}: FeedProps) {
  const { client } = usePodcastIndex();

  return (
    <Grid container spacing={3} direction="column" alignItems="stretch">
      {episodes.map((episode) => (
        <Grid item xs key={episode.id}>
          <Episode
            episodeId={episode.id}
            playbackStates={playbackStates}
            // updatePodcasterSubscription={updatePodcasterSubscription}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            activeEpisode={activeEpisode}
            setActiveEpisode={setActiveEpisode}
          ></Episode>
        </Grid>
      ))}
    </Grid>
  );
}

export default React.memo(Feeds);
