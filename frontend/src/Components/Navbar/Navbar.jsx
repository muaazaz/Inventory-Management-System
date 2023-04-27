import {
  Avatar,
  Box,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { useEffect, useState } from "react";
import "./navbar.css";
import {
  adminRoutes,
  employeeRoutes,
  superAdminRoutes,
} from "../../Constant/componentConstants";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/user/userAction";
import { NavStyles, appBar, avatarDiv, mainDiv, responsiveDiv, responsiveNavStyles } from "./styles";

const Navbar = () => {
  const [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    [openResp, setOpenResp] = useState(false),
    [anchorRespEl, setAnchorRespEl] = useState(null),
    [pages, setPages] = useState([]),
    data = useSelector((state)=>state.userValidation),
    dispatch = useDispatch(),
    navigate = useNavigate()

  //TO open user menu
  const handleUserMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  //Closing user menu
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setAnchorRespEl(null);
    setOpenResp(false);
  };
  //For loggin out
  const handleLogout = () => {
    dispatch(logOut())
    navigate('/')
    handleClose();
  };
  //Handling responsive menu
  const handleRespMenu = (e) => {
    setAnchorRespEl(e.currentTarget);
    setOpenResp(true);
  };

  useEffect(()=>{
    if (data.role === "superadmin") {
      setPages(superAdminRoutes);
    } else if (data.role === "admin") {
      setPages(adminRoutes);
    } else {
      setPages(employeeRoutes);
    }
  },[data])

  return (
    <div>
      <AppBar position="static" sx={appBar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={mainDiv}
            >
              <img src="/gigalabs.png" alt="" className="giga" />
              {pages.map((page) => (
                <NavLink
                  key={page}
                  to={
                    page === "Admins"
                    ? "user"
                    : page === "Employees"
                    ? "user"
                    : page.toLowerCase()
                  }
                  style={NavStyles}
                >
                  {page}
                </NavLink>
              ))}
            </Box>
            {/* Reponsive Menu */}
            <Box sx={responsiveDiv}>
              <MenuIcon onClick={handleRespMenu} />
              <Menu
                open={openResp}
                onClose={handleClose}
                anchorEl={anchorRespEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleClose}>
                    <NavLink
                      key={page}
                      to={
                        page === "Admins"
                          ? "user"
                          : page === "Employees"
                          ? "user"
                          : page.toLowerCase()
                      }
                      style={responsiveNavStyles}
                    >
                      {page}
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* User avatar menu */}
            <Box sx={avatarDiv}>
              <Typography variant="content" sx={{color: "black"}}>{data.name}</Typography>
              <IconButton
                sx={{float: "right"}}
                onClick={handleUserMenu}
              >
                <Avatar src="/avatar.png" />
              </IconButton>
              <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <MenuItem>
                  <Button sx={{ color: "gray" }} onClick={handleLogout}>
                    Log Out
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
