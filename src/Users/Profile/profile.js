import { useEffect, useState } from "react";
import NavBar from "../../NavBar/navbar.js";
import * as client from "../client";
import { useNavigate } from "react-router-dom";
import './profile.css'

function Profile() {
    const [user, setUser] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        role: 'PERSONAL',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await client.account();
                if (userData) {
                    setUser(userData);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <NavBar />
            <div className="profile-page">
                {user ? (
                    <div className="form-container">
                        <h1>{user.username}'s Profile</h1>
                        <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" value={user.username} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" id="dob" name="dob" value={user.dob} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select className="form-control" id="role" name="role" value={user.role} onChange={handleInputChange}>
                                <option value="PERSONAL">Personal</option>
                                <option value="TRAINER">Trainer</option>
                            </select>
                        </div>                
                        <div className="profile-buttons">
                            <button className="btn btn-update mb-2" onClick={handleUpdate}>Update Profile</button>
                            <button className="btn btn-signout mb-2" onClick={handleSignOut}>Sign Out</button>
                            <button className="btn btn-delete" onClick={handleDelete}>Delete Account</button>
                        </div>
                    </form>
    
                    </div>
                ) : (
                    <div>
                        <h1>Please login</h1>
                        <Link to="/Login" className="btn btn-primary">Go to Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
