import Login from "../pages/Login";
import Home from "../pages/Home";
import Missing from "../pages/Missing";
import Dashboard from "../pages/Dashboard";
import { Avatar, ListItemIcon } from "@mui/material";
import { Settings } from "@mui/icons-material";
const routesPublic = [
    { path: "/", element: <Home /> },
    { path: "home", element: <Home /> },
    { path: "login", element: <Login /> },
    { path: "*", element: <Missing /> },
];
const routesPrivate = [{ path: "dashboard", element: <Dashboard /> }];
const navbarLinks = [
    {
        name: "Việc làm",
        path: "jobs",
    },
    {
        name: "Công ty",
        path: "companies",
    },
    {
        name: "Blog",
        path: "blogs",
    },
];

const settingNonLoginLinks = [
    {
        name: "Thông tin tài khoản",
        path: "accounts",
        childComponent: (
            <ListItemIcon>
                <Avatar fontSize="small" />
            </ListItemIcon>
        ),
    },
    {
        name: "Cài đặt",
        path: "settings",
        childComponent: (
            <ListItemIcon>
                <Settings fontSize="small" />
            </ListItemIcon>
        ),
    },
];
export { routesPublic, routesPrivate, navbarLinks, settingNonLoginLinks };
