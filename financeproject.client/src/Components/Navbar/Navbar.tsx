import React, {useState,useEffect, ChangeEvent, SyntheticEvent} from 'react'

import logo from './image-Photoroom.png'
import { Link } from 'react-router-dom';
import { MdDarkMode } from 'react-icons/md';
import { useAuth } from '../../Context/userAuth';
import ModernSearch from '../Search/Search';
import { useNavigate } from "react-router-dom"



const Navbar: React.FC = ():JSX.Element => {
    const [theme, setTheme] = useState("dark");
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();



    useEffect(() => {
        if (theme === "dark") {
            document.querySelector("html")!.classList.add("dark");

        } else {
            document.querySelector("html")!.classList.remove("dark");

        }
       

    }, [theme]);

    const handleChangeTheme = () => {
        setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
    }

    const { isLoggedIn, user, logout } = useAuth();

    const onSearchSubmit = async (e: SyntheticEvent) => { 

        e.preventDefault();
        navigate(`/search/${search}`);
        
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <img src={logo} alt="logo" />

                    </Link>
                    <Link to="/search" className="text-black hover:text-darkBlue dark:text-white">
                        Dashboard
                    </Link>
                    {isLoggedIn() ? (
                        <ModernSearch onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}></ModernSearch>


                    ) : ("")}

                </div>
                {isLoggedIn() ? (
                     
                    <div className="hidden lg:flex items-center space-x-6 text-back">
                        <button onClick={handleChangeTheme}><MdDarkMode /></button>
                        <div className="hover:text-darkBlue dark:text-white">Welcome {user?.userName}</div>
                        <a onClick={logout} className="px-8 py-3 font-bold rounded text-white bg-lightAmber hover:opacity-70 dark:text-slate-800">
                            Logout
                        </a>
                    </div>
                
                
                ) : (
                        <div className="hidden lg:flex items-center space-x-6 text-back">
                            <button onClick={handleChangeTheme}><MdDarkMode /></button>
                            <Link to="/login" className="hover:text-darkBlue dark:text-white">Login</Link>
                            <Link to="/register" className="px-8 py-3 font-bold rounded text-white bg-lightAmber hover:opacity-70 dark:text-slate-800">
                                Signup
                            </Link>
                        </div>

                    )}
                
            </div>
        </nav>
    );
}


export default Navbar;
