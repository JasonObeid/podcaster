import React from "react";
import ReactAudioPlayer from "./ReactAudioPlayer";
import { Controls } from "../../types/footer";

const LISTEN_INTERVAL = 1000;

export default function Player({
  playerRef,
  controls,
  src,
  onTickedCallback,
}: {
  playerRef: React.MutableRefObject<null | ReactAudioPlayer>;
  controls: Controls;
  src: string | undefined;
  playing: boolean;
  onTickedCallback: (newTime: number) => void;
}) {
  return (
    <ReactAudioPlayer
      ref={playerRef}
      autoPlay={false}
      muted={controls.isMuted}
      volume={controls.volume}
      src={src}
      loop={controls.isRepeat}
      listenInterval={LISTEN_INTERVAL}
      onListen={onTickedCallback}
    ></ReactAudioPlayer>
  );
}
