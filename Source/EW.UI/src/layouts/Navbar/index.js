import React, { useState } from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { navbarLinks, settingNonLoginLinks } from "../../common/routeList";
import useAuth from "../../hook/useAuth";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../redux/auth.slice";
import { ListItemIcon } from "@mui/material";
import { Group, Login, Logout } from "@mui/icons-material";

const RightMenuLogin = ({
    handleCloseUserMenu,
    navigate,
    handleLogoutUser,
}) => {
    return (
        <>
            {settingNonLoginLinks.map((setting) => (
                <MenuItem
                    key={setting.name}
                    onClick={() => {
                        handleCloseUserMenu();
                        navigate(setting.path);
                    }}
                >
                    {setting.childComponent}
                    <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
            ))}
            <MenuItem
                onClick={() => {
                    handleCloseUserMenu();
                    handleLogoutUser();
                }}
            >
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Đăng xuất</Typography>
            </MenuItem>
        </>
    );
};

const RightMenuNonLogin = ({ navigate, handleCloseUserMenu }) => {
    return (
        <>
            <MenuItem
                onClick={() => {
                    handleCloseUserMenu();
                    navigate("recruiter");
                }}
            >
                <ListItemIcon>
                    <Group fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Nhà tuyển dụng</Typography>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleCloseUserMenu();
                    navigate("login");
                }}
            >
                <ListItemIcon>
                    <Login fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Đăng nhập</Typography>
            </MenuItem>
        </>
    );
};

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleLogoutUser = () => {
        dispatch(handleLogout());
        navigate("/");
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
        console.log("handleCloseUserMenu");
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        onClick={() => navigate("/dashboard")}
                    >
                        EWork
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
                            {navbarLinks.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(page.path);
                                    }}
                                >
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => navigate("/")}
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
                        EWork
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {navbarLinks.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    navigate(page.path);
                                }}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
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
                            {user && (
                                <RightMenuLogin
                                    handleCloseUserMenu={handleCloseUserMenu}
                                    navigate={navigate}
                                    handleLogoutUser={handleLogoutUser}
                                />
                            )}
                            {!user && (
                                <RightMenuNonLogin
                                    navigate={navigate}
                                    handleCloseUserMenu={handleCloseUserMenu}
                                />
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
