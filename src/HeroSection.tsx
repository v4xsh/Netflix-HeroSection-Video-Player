import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Box, Stack } from "@mui/material";
import videojs from "video.js";
import Player from "video.js/dist/types/player";

import VideoJsPlayer from "./components/common/VideoJsPlayer";
import useOffSetTop from "./hooks/useOffSetTop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Navbar from "./components/common/ui/Navbar";
import PlayButton from "./components/common/ui/PlayButton";
import MaxLineTypography from "./components/MaxLineTypography";
import MoreInfoButton from "./components/common/ui/MoreInfoButton";
import MaturityRate from "./components/MaturityRate";
import NetflixIconButton from "./components/NetflixIconButton";

function HeroSection() {
  const playerRef = useRef<Player | null>(null);

  const videoJsOptions = useMemo(
    () => ({
      autoplay: true,
      controls: false,
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

  // OffSetTop logic
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
            zIndex: 11,
          }}
        >
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
            {/* Video Player */}
            <Box
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
              }}
            >
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

            {/* Video Metadata & Controller Buttons */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Stack
                spacing={4}
                sx={{
                  bottom: "35%",
                  position: "absolute",
                  left: { xs: "4%", md: "60px" },
                  top: 0,
                  width: "36%",
                  zIndex: 10,
                  justifyContent: "flex-end",
                }}
              >
                <MaxLineTypography variant="h2" maxLine={1} color="#fff">
                  React great again?
                </MaxLineTypography>
                <MaxLineTypography variant="h5" maxLine={3} color="#fff">
                  Let's take a first look at React 19 and a variety of changes
                  will improve the developer experience. We compare React's
                  changes to other JavaScript frameworks like Svelte, Vue, and
                  Angular.
                </MaxLineTypography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <PlayButton size="large" />
                  <MoreInfoButton size="large" />
                </Stack>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                  position: "absolute",
                  right: 0,
                  bottom: "35%",
                }}
              >
                <NetflixIconButton
                  size="large"
                  onClick={() => handleMute(muted)}
                  sx={{ zIndex: 2 }}
                >
                  {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </NetflixIconButton>
                <MaturityRate>{`18+`}</MaturityRate>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HeroSection;
