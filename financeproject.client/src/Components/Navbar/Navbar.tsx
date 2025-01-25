import React, {useState,useEffect} from 'react'

import logo from './logoNabvar.png'
import { Link } from 'react-router-dom';
import { MdDarkMode } from 'react-icons/md';
import { useAuth } from '../../Context/userAuth';

interface Props { }

const Navbar: React.FC<Props> = (props:Props):JSX.Element => {
    const [theme, setTheme] = useState("dark");

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

    const { isLoggedIn,user,logout} = useAuth();

    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <img src={logo} alt="" />

                    </Link>
                    <div className="hidden font-bold lg:flex">
                        <Link to="/search" className="text-black hover:text-darkBlue dark:text-white">
                            Dashboard
                        </Link>
                    </div>
                </div>
                {isLoggedIn() ? (
                    <div className="hidden lg:flex items-center space-x-6 text-back">
                        <button onClick={handleChangeTheme}><MdDarkMode /></button>
                        <div className="hover:text-darkBlue dark:text-white">Welcome {user?.userName}</div>
                        <a onClick={logout} className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70 dark:text-slate-800">
                            Logout
                        </a>
                    </div>
                
                
                ) : (
                        <div className="hidden lg:flex items-center space-x-6 text-back">
                            <button onClick={handleChangeTheme}><MdDarkMode /></button>
                            <Link to="/login" className="hover:text-darkBlue dark:text-white">Login</Link>
                            <Link to="/register" className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70 dark:text-slate-800">
                                Signup
                            </Link>
                        </div>

                    )}
                
            </div>
        </nav>
    );
}


export default Navbar;