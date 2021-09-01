import { Types } from "podcastindexjs";

export type episodeParams = {
  episodeId?: string;
};

export type EpisodeProps = {
  episodeId: number | undefined;
  activeEpisode: Types.PIApiEpisodeInfo | undefined;
  setActiveEpisode: React.Dispatch<
    React.SetStateAction<Types.PIApiEpisodeInfo | undefined>
  >;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playbackStates: Map<number, number>;
};
