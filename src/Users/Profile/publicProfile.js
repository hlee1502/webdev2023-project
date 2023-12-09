import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as client from '../client.js';
import './publicProfile.css'; 
import NavBar from "../../NavBar/navbar";

function PublicProfile() {
    const [profile, setProfile] = useState(null);
    const { profileId } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await client.findUserById(profileId);
                if (profileData.dob) {
                    const dobDate = new Date(profileData.dob);
                    profileData.dob = dobDate.toLocaleDateString('en-GB');
                }
                setProfile(profileData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfile();
    }, [profileId]);

    return (
        <div>
            <NavBar />
            <div className="public-profile-page">
                {profile ? (
                    <div className="public-profile-content">
                        <h1>{profile.username}'s Profile</h1>
                        <p className="public-profile-info"><span className="public-profile-info-title">First Name:</span> {profile.firstName}</p>
                        <p className="public-profile-info"><span className="public-profile-info-title">Last Name:</span> {profile.lastName}</p>
                        <p className="public-profile-info"><span className="public-profile-info-title">Email:</span> {profile.email}</p>
                        <p className="public-profile-info"><span className="public-profile-info-title">Date of Birth:</span> {profile.dob}</p>
                        <div className="email-button-wrapper">
                            <a href={`mailto:${profile.email}`} className="email-button">Send Email</a>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}

export default PublicProfile;