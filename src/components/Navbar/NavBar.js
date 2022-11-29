import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchForm from "../../Pages/Search/SearchForm";
import SearchIcon from "@mui/icons-material/Search";
import Hidden from "@mui/material/Hidden";

const pages = ["dashboard", "favorite"];
const settings = [
  { page: "My Profile", link: "/profile" },
  { page: "Logout", link: "/" },
];

function NavBar({ currentUser }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("myKitchenAppToken");
    localStorage.removeItem("myKitchenAppUser");
    navigate("/", { replace: true });
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <AppBar sx={{ bgcolor: "rgb(0, 0, 0)" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              marginRight: "20px",
            }}
            alt="logo"
            src="/MyKitchenLogoNoName.jpeg"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "rgb(255, 255, 255)",
              textDecoration: "none",
            }}
          >
            MyKitchen
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      style={{
                        textDecoration: "none",
                        color: "rgb(0, 0, 0)",
                      }}
                      to={`/${page}`}
                    >
                      {page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
              <a
                onClick={handleClickOpen}
                sx={{
                  color: "black",
                }}
              >
                search
              </a>
              <SearchForm open={open} onClose={handleClose} />
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyKitchen
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "flex-end",
                marginRight: 50,
              },
            }}
          >
            <Button
              onClick={handleClickOpen}
              sx={{
                fontSize: "1.2rem",
                backgroundColor: "black",
                color: "white",
              }}
            >
              <SearchIcon />
              Search
            </Button>
            <SearchForm open={open} onClose={handleClose} />
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "rgb(255, 255, 255)",
                  }}
                  to={`/${page}`}
                >
                  {page}
                </NavLink>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Name">{currentUser.name.charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting.page}
                  onClick={() => {
                    handleCloseUserMenu();
                    setting.page === "Logout" && handleLogout();
                  }}
                >
                  {setting.page !== "Logout" ? (
                    <NavLink
                      style={{
                        textDecoration: "none",
                        color: "rgb(0, 0, 0)",
                      }}
                      to={setting.link}
                    >
                      {setting.page}
                    </NavLink>
                  ) : (
                    setting.page
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
