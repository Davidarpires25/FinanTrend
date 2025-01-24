/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from "./Context/userAuth";

function App() {

    

    return (
            <UserProvider>
            <div className="App min-h-screen dark:bg-darkBg">

                <Navbar />
                <Outlet />
                <ToastContainer />
            </div>
            </UserProvider>
            
    );
}

export default App;