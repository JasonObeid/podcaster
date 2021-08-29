import { Types } from "podcastindexjs";

export type Controls = {
  isMuted: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  volume: number;
};

export type FooterProps = {
  playbackStates: Map<number, number>;
  setPlaybackStates: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  activeEpisode: Types.PIApiEpisodeInfo | undefined;
  setActiveEpisode: React.Dispatch<
    React.SetStateAction<Types.PIApiEpisodeInfo | undefined>
  >;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  episodes: Types.PIApiEpisodeInfo[];
};
