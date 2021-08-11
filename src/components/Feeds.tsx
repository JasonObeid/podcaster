import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";
import { PIApiEpisodeInfo, PIApiFeed } from "../podcast-client/types";
import { usePodcastIndex } from "../context/PodcastIndexContext";

import Episode from "./Episode";

type FeedProps = {
  feed: PIApiEpisodeInfo[];
  activeEpisode: PIApiEpisodeInfo | undefined;
  setActiveEpisode: React.Dispatch<
    React.SetStateAction<PIApiEpisodeInfo | undefined>
  >;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playbackStates: Map<number, number>;
};

function Feeds({
  feed,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
}: FeedProps) {
  const { client } = usePodcastIndex();
  console.log(feed);
  return (
    <Grid container spacing={3} direction="column" alignItems="stretch">
      {feed.map((episode) => (
        <Grid item xs key={episode.id} component="article">
          <Episode
            episode={episode}
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
