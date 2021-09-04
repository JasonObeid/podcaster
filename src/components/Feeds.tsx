import Grid from "@material-ui/core/Grid";
import React from "react";
import Episode from "./Episode";
import { FeedProps } from "../types/feed";
import Typography from "@material-ui/core/Typography";

function Feeds({
  episodes,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
}: FeedProps) {
  if (episodes.length > 0) {
    return (
      <Grid container spacing={3} direction="column" alignItems="stretch">
        {episodes.map((episode) => (
          <Grid item xs key={episode.id} component={"article"}>
            <Episode
              episodeId={episode.id}
              playbackStates={playbackStates}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              activeEpisode={activeEpisode}
              setActiveEpisode={setActiveEpisode}
            ></Episode>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <Typography>
        Your feed is currently empty - try subscribing to a podcast!
      </Typography>
    );
  }
}

export default Feeds;
