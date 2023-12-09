import {Routes, Route, Navigate} from "react-router";
import NavBar from "../../NavBar/navbar.js"
import "./account.css";
import * as client from "../client";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";

function Account() {
    const {id} = useParams();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();

    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };

    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };
    
    const save = async () => {
        await client.updateUser(account);
        navigate(`/Profile`);
    };

    useEffect(() => {
        if (id) {findUserById(id);} 
        else {fetchAccount();}
    }, []);

    return(
        <div>
            <NavBar/>
            <div className="wd-account">
                <div className="wd-form-border">
                    <h3>Account Information</h3>
                    <div className="wd-account-content mt-3">
                    {account && (
                        <div className="form-container">

                            <div className="form-floating mb-3">
                                <input id="username" 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Username"
                                    value={account.username}
                                    onChange={(e) => setAccount({...account, username: e.target.value})}/>
                                <label for="username">Username</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="password" 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                    value={account.password}
                                    onChange={(e) => setAccount({...account, password: e.target.value})}/>
                                <label for="password">Password</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="firstName" 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="First Name"
                                    value={account.firstName}
                                    onChange={(e) => setAccount({...account, firstName: e.target.value})}/>
                                <label for="firstName">First Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="lastName" 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Last Name"
                                    value={account.lastName}
                                    onChange={(e) => setAccount({...account, lastName: e.target.value})}/>
                                <label for="lastName">Last Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="email" 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Email"
                                    value={account.email}
                                    onChange={(e) => setAccount({ ...account, email: e.target.value })}/>
                                <label for="email">Email</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input id="dob" 
                                    type="date" 
                                    className="form-control" 
                                    placeholder="Birthday"
                                    value={account.dob}
                                    onChange={(e) => setAccount({ ...account, dob: e.target.value })}/>
                                <label for="dob">Birthday</label>
                            </div>

                            <div className="form-floating mb-3">
                                <select className="form-select" 
                                    id="accountUser" 
                                    placeholder="Select Account Usage"
                                    onChange={(e) => setAccount({ ...account, role: e.target.value })}>
                                    <option value="PERSONAL">PERSONAL</option>
                                    <option value="TRAINER">TRAINER</option>
                                </select>
                                <label for="accountUser">Select Account Usage:</label>
                            </div>

                            <span className="account-note">**Note: Making your account a TRAINER account will make your profile public.**</span>
                        </div>
                    )}
                          
                        <button className="btn btn-primary btn-lg mt-3" onClick={save}>Signup</button> 
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Account;