import React, { useEffect, useState } from 'react';
import NavBar from "../NavBar/navbar.js";
import * as client from "../Users/client.js"; 
import { TiDelete } from 'react-icons/ti';
import './myExercises.css';

function MyExercises() {
    const [likedExercises, setLikedExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await client.account();
                if (userData && userData.likedExercises) {
                    setLikedExercises(userData.likedExercises);
                    setFilteredExercises(userData.likedExercises);
                }
                setCurrentUser(userData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = likedExercises.filter(exercise => 
            exercise.toLowerCase().includes(query)
        );
        setFilteredExercises(filtered);
    };

    const handleDelete = async (exerciseName) => {
        if (!currentUser) {
            alert("You must be logged in to delete exercises.");
            return;
        }

        try {
            await client.removeLikedExercise(currentUser._id, exerciseName);
            const updatedLikedExercises = likedExercises.filter(e => e !== exerciseName);
            setLikedExercises(updatedLikedExercises);
            setFilteredExercises(updatedLikedExercises);
        } catch (error) {
            console.error("Error deleting exercise:", error);
        }
    };

    return (
        <div>
            <NavBar/>
            <div className="my-exercises">
                <div className='mt-4'>
                    <h2>My Exercises</h2>
                    <hr className="header-divider"/> 
                </div>
                <div className='search-bar'>
                    <input
                        type="text"
                        className="form-control mt-3 mb-3"
                        placeholder="Search exercises..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                
                {!loading && (
                    filteredExercises.length > 0 ? (
                        <div className='my-exercises-container'>
                            <ul className="list-group d-inline-block text-truncate">
                                {filteredExercises.map((exercise, index) => (
                                    <div className='row align-items-center'>
                                        <div className='col-10'>
                                            <li key={index} className="list-group-item">
                                                <div className='text-truncate'>
                                                    <span className="exercise-text">{exercise}</span>
                                                </div>
                                                <hr className="exercise-divider"/> 
                                            </li>
                                        </div>
                                        <div className='col-2'>
                                            <button className="btn delete-btn" onClick={() => handleDelete(exercise)}>
                                                <TiDelete size="1.5em" />
                                            </button> 
                                        </div>
                                    </div>  
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className='no-exercise'>{searchQuery ? 'No exercises found for your search.' : 'You don\'t have any liked exercises.'}</p>
                    )
                )}
            </div>
        </div>
    );
}

export default MyExercises;
