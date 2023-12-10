import {Routes, Route, Navigate} from "react-router";
import NavBar from "../../NavBar/navbar.js";
import './login.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import * as client from "../client.js";


function Login() {
    const {pathname} = useLocation();

    const[credentials, setCredentials] = useState({username: "", password: ""});

    const navigate = useNavigate();

    const signin = async () => {
        try {
            await client.signin(credentials);
            navigate(`/Home`);
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <div>
            <NavBar/>
            <div className="wd-login">
                <div className="wd-form-border">
                    <h3>Login</h3>
                    <div className="wd-login-content mt-4">
                        <div className="form-container">
                            <div className="form-floating mb-3">
                                <input id="username" 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Username"
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                                <label for="username">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input id="password" 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                                <label for="password">Password</label>
                            </div>
                        </div>  
                        <button className="btn btn-primary btn-lg mb-3" onClick={signin}>Login</button> 
                    </div>
                </div>
                <p className="mt-5">Need an account? 
                    <Link to="/Register" className={`wd-join ${pathname.includes("Register") ? "active" : ""}`}>JOIN NOW</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
