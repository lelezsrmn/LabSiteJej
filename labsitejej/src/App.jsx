import './index.css';
import React, { useEffect } from 'react';
import Modal from 'react-modal';

import Home from "./pages/Home";
import Schedule from "./pages/Schedule.jsx";

import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/Schedule",
        element: <Schedule/>
    }
]);

function App() {

    return (
        //
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
