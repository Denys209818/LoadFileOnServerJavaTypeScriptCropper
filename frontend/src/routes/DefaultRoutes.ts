import React from "react";
import { IDefaultRoutes } from "./types";

// Загрузка компоненту Main, коли він необхідний
const Main = React.lazy(() => import("../components/Default/Main"));
// Загрузка компоненту Create, коли він необхідний
const Create = React.lazy(() => import("../components/Default/Create"));

// Інціалізція масиву з маршуртів і прилягаючих до них компонентів
export const DefaultRoutes: Array<IDefaultRoutes> = 
[
    {path: '/', element: Main},
    {path: '/create', element: Create}
];