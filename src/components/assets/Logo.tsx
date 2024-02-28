import Box, { BoxProps } from "@mui/material/Box";
import NetflixLogo from "../../assets/netflix-logo.svg";

export default function Logo({ sx }: BoxProps) {
  return (
    <Box
      component="img"
      alt="Netflix Logo"
      src={NetflixLogo}
      width={120}
      height={30}
      sx={{
        ...sx,
      }}
    />
  );
}
