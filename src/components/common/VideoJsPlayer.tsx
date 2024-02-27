import { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";
import { VideoJsPlayerOptions } from "@types/video.js";

const VideoJsPlayer = ({ options, onReady }: {
  options: VideoJsPlayerOptions;
  onReady: (player: Player) => void;
}) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("Player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJsPlayer;
