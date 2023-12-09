import {Routes, Route, Navigate} from "react-router";
import NavBar from "../../NavBar/navbar.js"
import "./register.css";
import * as client from "../client.js";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
    const [error, setError] = useState("");

    const [credentials, setCredentials] = useState({username: "", password: ""});

    const navigate = useNavigate();

    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate(`/Account`);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return(
        <div>
            <NavBar/>
            <div className="wd-signup">
                <div className="wd-form-border">
                    <h3>Register</h3>
                    {error && <div>{error}</div>}
                    <div className="wd-signup-content mt-4">
                        <div className="form-container">
                            <div className="form-floating mb-3">
                                <input id="username" 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Username"
                                    value={credentials.username}
                                    onChange={(e) => {
                                        setCredentials({...credentials, username: e.target.value});
                                    }}/>
                                <label for="username">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input id="password" 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={(e) => {
                                        setCredentials({...credentials, password: e.target.value});
                                    }}/>
                                <label for="password">Password</label>
                            </div>
                        </div>  
                        <button className="btn btn-primary btn-lg mb-3" onClick={signup}>Signup</button> 
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Register;