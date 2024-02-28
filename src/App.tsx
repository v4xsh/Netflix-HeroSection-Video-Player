import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Box, Button, Stack } from "@mui/material";
import videojs from "video.js";
import Player from "video.js/dist/types/player";

import VideoJsPlayer from "./components/common/VideoJsPlayer";
import useOffSetTop from "./hooks/useOffSetTop";
import Logo from "./components/assets/Logo";
import Navbar from "./components/common/ui/Navbar";

function App() {
  const playerRef = useRef<Player | null>(null);

  const videoJsOptions = useMemo(
    () => ({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      fill: true,
      loop: true,
      muted: true,

      techOrder: ["youtube"],
      sources: [
        {
          src: "https://www.youtube.com/watch?v=4k6Xgjqkad4",
          type: "video/youtube",
        },
      ],
    }),
    []
  );

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const [muted, setMuted] = useState(true);
  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  const isOffset = useOffSetTop(window.innerWidth * 0.5625);
  useEffect(() => {
    if (playerRef.current) {
      if (isOffset) {
        playerRef.current.pause();
      } else {
        if (playerRef.current.paused()) {
          playerRef.current.play();
        }
      }
    }
  }, [isOffset]);

  return (
    <>
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
          }}
        >
          {/* <Button sx={{ color: "white" }} onClick={() => handleMute(muted)}>
            {muted ? "Unmute" : "Mute"}
          </Button> */}
          <Navbar />
        </Box>
        <Box
          sx={{
            mb: "100%",
            pb: "40%",
            top: 0,
            left: 0,
            right: 0,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "56.25vw",
              position: "absolute",
            }}
          >
            <Box
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
              }}
            >
              <Box
                sx={{
                  // background: "rgb(20,20,20)",
                  background:
                    "linearGradient(180deg, rgba(20,20,20,1) 0%, rgba(41,41,41,1) 61%, rgba(0,212,255,0) 100%)",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0px top",
                  backgroundSize: "100% 100%",
                  top: 0,
                  position: "absolute",
                  height: "20.7vw",
                  opacity: 1,
                  width: "100%",
                }}
              />
              <VideoJsPlayer
                options={videoJsOptions}
                onReady={handlePlayerReady}
              />
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
