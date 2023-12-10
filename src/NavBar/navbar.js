import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import blueLogo from '../images/bluelogo.png'; 
import { LuSearch } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import * as client from "../Users/client.js"; // Assuming client.js contains the account fetching logic

function NavBar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await client.account();
                setCurrentUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSearch = () => {
        const searchQuery = document.getElementById('searchBar').value;
        navigate(`/search/${searchQuery}`); 
    };

    return (
        <div className="wd-navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light wd-navbar">
                <div className="wd-nav-padding container-fluid">
                    <Link to="/Home" className={`navbar-brand ${pathname.includes("Home") ? "active" : ""}`} 
                        style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={blueLogo} alt="Logo" style={{ width: '55px',}} /> 
                            <span className="wd-title">Fitness Lab</span>
                    </Link>                    
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/Home" className={`nav-link ${pathname.includes("/Home") ? "active" : ""}`}>
                                    <span className='name-home'>Home</span>
                                    <span className='icon-home'><FaHome/></span>
                                </Link>
                            </li>
                            {currentUser && (
                                <li className="nav-item">
                                    <Link to="/MyExercises" className={`nav-link ${pathname.includes("/MyExercises") ? "active" : ""}`}>
                                        <span className='name-exercise'>My Exercises</span>
                                        <span className='icon-exercise'><FaDumbbell/></span>
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link to="/Profile" className={`nav-link ${pathname.includes("/Profile") ? "active" : ""}`}>
                                    <span className='name-profile'>Profile</span>
                                    <span className='icon-profile'><FaUser/></span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Login" className={`nav-link ${pathname.includes("/Login") || pathname.includes("/Register") ? "active" : ""}`}>
                                    <span className='name-login'>Login/Register</span>
                                    <span className='icon-login'><FiLogIn/></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="wd-home-end d-flex justify-content-end">
                        <div className="input-group">
                            <div className="form-outline">
                                <input type="search" id="searchBar" className="wd-search-bar form-control" placeholder="search exercises..."/>
                            </div>
                            <button type="button" className="btn btn-primary d-flex align-items-center" onClick={handleSearch}><LuSearch/></button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
    
    }    

export default NavBar;