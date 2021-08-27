import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect, useState } from "react";
import { Types } from "podcastindexjs";

import Podcast from "./Podcast";

type SubscriptionsProps = {
  subscriptions: Types.PIApiPodcast[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Types.PIApiPodcast[]>>;
  activeEpisode: Types.PIApiEpisodeInfo | undefined;
  setActiveEpisode: React.Dispatch<
    React.SetStateAction<Types.PIApiEpisodeInfo | undefined>
  >;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playbackStates: Map<number, number>;
};

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

export default React.memo(Subscriptions);
