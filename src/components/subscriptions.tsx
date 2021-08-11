import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";
import { PIApiPodcast } from "../podcast-client/types";

import Podcast from "./Podcast";

type SubscriptionsProps = {
  subscriptions: PIApiPodcast[];
  setSubscriptions: React.Dispatch<React.SetStateAction<PIApiPodcast[]>>;
};

function Subscriptions({
  subscriptions,
  setSubscriptions,
}: SubscriptionsProps) {
  return (
    <Grid container spacing={3} direction="column" alignItems="stretch">
      {subscriptions.map((podcast) => (
        <Grid item key={podcast.id}>
          <Podcast
            podcast={podcast}
            subscriptions={subscriptions}
            setSubscriptions={setSubscriptions}
            // playbackStates={playbackStates}
            // activeEpisode={activeEpisode}
          ></Podcast>
        </Grid>
      ))}
    </Grid>
  );
}

export default React.memo(Subscriptions);
