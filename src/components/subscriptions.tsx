import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { SubscriptionsProps } from "../types/subscriptions";

import Podcast from "./Podcast";

function Subscriptions({
  subscriptions,
  setSubscriptions,
  activeEpisode,
  setActiveEpisode,
  isPlaying,
  setIsPlaying,
  playbackStates,
}: SubscriptionsProps) {
  if (subscriptions.length > 0) {
    return (
      <Grid container spacing={3} direction="column" alignItems="stretch">
        {subscriptions.map((podcast) => (
          <Grid item key={podcast.id}>
            <Podcast
              podcastId={podcast.id}
              subscriptions={subscriptions}
              setSubscriptions={setSubscriptions}
              playbackStates={playbackStates}
              activeEpisode={activeEpisode}
              setActiveEpisode={setActiveEpisode}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            ></Podcast>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <Typography>No Active Subscriptions</Typography>;
  }
}

export default Subscriptions;
