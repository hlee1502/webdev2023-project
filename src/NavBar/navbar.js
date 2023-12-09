import React from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import logoImage from '../images/logo.png';
import blueLogo from '../images/bluelogo.png'; 
import { LuSearch } from "react-icons/lu";
import { CiUser } from "react-icons/ci";

function NavBar() {
    const {pathname} = useLocation();
    const navigate = useNavigate();

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
                                <Link to="/Home" className={`nav-link ${pathname.includes("/Home") ? "active" : ""}`}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/MyExercises" className={`nav-link ${pathname.includes("/MyExercises") ? "active" : ""}`}>My Exercises</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Profile" className={`nav-link ${pathname.includes("/Profile") ? "active" : ""}`}>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Login" className={`nav-link ${pathname.includes("/Login") || pathname.includes("/Register") ? "active" : ""}`}>Login/Register</Link>
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
                    {/* Other navbar elements */}
                </div>
            </nav>
        </div>
    );
    }    

export default NavBar;