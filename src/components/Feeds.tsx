import Grid from "@material-ui/core/Grid";
import React from "react";
import Episode from "./Episode";
import { FeedProps } from "../types/feed";

function Feeds({
  episodes,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
}: FeedProps) {
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

export default Feeds;
