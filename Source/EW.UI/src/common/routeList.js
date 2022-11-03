import Login from "../pages/Login";
import Home from "../pages/Home";
import Missing from "../pages/Missing";
import Dashboard from "../pages/Dashboard";
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
        name: "Trang cá nhân",
        path: "my-profile",
    },
    {
        name: "Thông tin tài khoản",
        path: "accounts",
    },
    {
        name: "Đổi mật khẩu",
        path: "change-password",
    },
];
export { routesPublic, routesPrivate, navbarLinks, settingNonLoginLinks };
