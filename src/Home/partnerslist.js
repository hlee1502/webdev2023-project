import React, { useEffect, useState } from 'react';
import * as client from '../Users/client.js';
import { useNavigate } from 'react-router-dom';
import './partnerslist.css'; 

function PartnersList() {
    const [partners, setPartners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const partnersData = await client.findAllUsers();
                const trainers = partnersData.filter(partner => partner.role === 'TRAINER');
                setPartners(trainers);
            } catch (error) {
                console.error("Error fetching partners data:", error);
            }
        };

        fetchPartners();
    }, []);

    const handleCardClick = (partnerId) => {
        navigate(`/profile/${partnerId}`);
    };

    return (
        <div>
            <h2 className="partners-header">Partners</h2>
            <hr className="header-home" />
            <div className="partners-list">
                {partners.map((partner, index) => (
                    <div key={index} className="partner-card" onClick={() => handleCardClick(partner._id)}>
                        <div className="card-title">{partner.role}</div>
                        <div className="card-body">
                            {partner.firstName} {partner.lastName}
                            <div className="card-email">{partner.email}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PartnersList;
