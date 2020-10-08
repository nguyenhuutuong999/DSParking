import React from "react";
import Home from "./pages/User/Home/index";
import Account from "./pages/User/Account/index";
import Evaluation from "./pages/User/Evaluation/index";
import Notifications from "./pages/User/Notifications/index";
import Profile from "./pages/User/Profile/index";
import Setting from "./pages/User/Setting/index";
import Statistic from "./pages/User/Statistic/index";
import Support from "./pages/User/Support/index";
import Login from "./layouts/Login/LayoutLogin";
const routes = [
    {
        path: "/",
        exact : true,
        main : () => <Home/>
    },
    {
        path: "/account",
        exact : false,
        main : () => <Account/>
    },
    {
        path: "/evaluation",
        exact : false,
        main : () => <Evaluation/>
    },
    {
        path: "/notifications",
        exact : false,
        main : () => <Notifications />
    },
    {
        path: "/profile",
        exact : false,
        main : () => <Profile/>
    },
    {
        path: "/setting",
        exact : false,
        main : () => <Setting/>
    },
    {
        path: "/statistic",
        exact : false,
        main : () => <Statistic/>
    },
    {
        path: "/support",
        exact : false,
        main : () => <Support/>
    },
    // {
    //     path: "/logout",
    //     exact : false,
    //     main : () => <Login/>
    // },
    // {
    //     path: "/login",
    //     exact : false,
    //     main : () => <Login/>
    // },
   
]
export default routes;
