import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../../assets/Logo";

export default function Navbar() {
  // State to track the Menu bar
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Handle Menu Open
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // Handle Menu Close
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        zIndex: 3,
        bgcolor: "#141414",
        width: "100%",
        py: "20px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4 }}
      >
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {/* Logo */}
          <Logo sx={{ mr: 2, cursor: "pointer" }} />

          {/* Nav bar items */}
          {["My List", "Movies", "Tv Shows"].map((page) => (
            <Box sx={{ cursor: "pointer" }} key={page}>
              {page}
            </Box>
          ))}
        </Stack>

        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          alignItems="center"
          flexWrap="wrap"
        >
          {/* Search Icon */}
          <SearchIcon sx={{ cursor: "pointer" }} />

          {/* Menu and User Icon */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user_avatar" src="/avatar.png" variant="rounded" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="avatar-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {["Account", "Logout"].map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>
      </Stack>
    </AppBar>
  );
}
