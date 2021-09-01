import { Types } from "podcastindexjs";

export type SubscriptionsProps = {
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
