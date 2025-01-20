/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import React from "react";

function App() {

    

    return (
        <div className="App min-h-screen dark:bg-darkBg">
            <Navbar />
            <Outlet/>
        </div>
    );
}

export default App;