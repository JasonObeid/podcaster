import Grid from "@material-ui/core/Grid";
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
}

export default Subscriptions;
