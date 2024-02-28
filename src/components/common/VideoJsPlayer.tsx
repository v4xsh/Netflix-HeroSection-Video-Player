import { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";
import { VideoJsPlayerOptions } from "@types/video.js";
import { Box } from "@mui/material";

const VideoJsPlayer = ({
  options,
  onReady,
}: {
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
    <>
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
      <Box
        sx={{
          background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
          top: 0,
          left: 0,
          bottom: 0,
          right: "26.09%",
          opacity: 1,
          position: "absolute",
          transition: "opacity .5s",
        }}
      />
      <Box
        sx={{
          backgroundColor: "transparent",
          backgroundImage:
            "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "0px top",
          backgroundSize: "100% 100%",
          bottom: 0,
          position: "absolute",
          height: "20.7vw",
          opacity: 1,
          top: "auto",
          width: "100%",
        }}
      />
    </>
  );
};

export default VideoJsPlayer;
