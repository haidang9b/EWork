import React from "react";
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
export { routesPublic, routesPrivate };
