import {
    AppBar,
    Avatar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    sidebarFacultyData,
    sidebarNonLoginData,
    sidebarRecruiterData,
    sidebarStudentData,
} from "../../common/routeList";
import useAuth from "../../hook/useAuth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Group, Login, Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../redux/auth.slice";

export default function Navbar() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    let navbarItemsList =
        user?.role === "Faculty"
            ? sidebarFacultyData
            : user?.role === "Student"
            ? sidebarStudentData
            : user?.role === "Business"
            ? sidebarRecruiterData
            : sidebarNonLoginData;
    const navigate = useNavigate();
    const [openSideBar, setOpenSideBar] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setOpenSideBar(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            onClick={() => navigate("/")}
                        >
                            Ework
                        </Typography>
                        {user ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="Avatar"
                                            src={
                                                user?.certthumbprint
                                                    ? user?.certthumbprint
                                                    : "/static/images/avatar/2.jpg"
                                            }
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
                                ></Menu>
                            </Box>
                        ) : (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open Logins">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <AccountCircle />
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
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            navigate("recruiter-sign-up");
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Group fontSize="small" />
                                        </ListItemIcon>
                                        <Typography textAlign="center">
                                            Nhà tuyển dụng
                                        </Typography>
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
                                        <Typography textAlign="center">
                                            Đăng nhập
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                anchor="left"
                open={openSideBar}
                onClose={() => setOpenSideBar(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenSideBar(false)}
                >
                    {user && (
                        <>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={handleOpenUserMenu}
                                    >
                                        <ListItemIcon sx={{ p: 0 }}>
                                            <Avatar
                                                alt="Avatar"
                                                src={
                                                    user?.certthumbprint
                                                        ? user?.certthumbprint
                                                        : "/static/images/avatar/2.jpg"
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Xin chào{" "}
                                            <strong>{user?.given_name}</strong>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <Divider />
                        </>
                    )}

                    <List>
                        {navbarItemsList.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        setOpenSideBar(false);
                                        navigate(`${item.path}`);
                                    }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {user && (
                            <>
                                <Divider />

                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            setOpenSideBar(false);
                                            dispatch(handleLogout());
                                            navigate("/");
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Logout />
                                        </ListItemIcon>
                                        <ListItemText primary="Đăng xuất" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
