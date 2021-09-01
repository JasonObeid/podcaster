import { Types } from "podcastindexjs";

export type searchParams = {
  term?: string;
};

export type SearchProps = {
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
