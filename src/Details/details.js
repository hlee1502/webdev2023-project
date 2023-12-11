import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/navbar.js";
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import * as client from "../Users/client.js"; 

import "./details.css";

function Details() {
    const { name } = useParams();
    const [exercise, setExercise] = useState(null);
    const [trainersWhoLiked, setTrainersWhoLiked] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); 

    useEffect(() => {
        async function fetchDetails() {
            try {
                const externalResponse = await axios.get(`https://api.api-ninjas.com/v1/exercises?name=${name}`, {
                    headers: { 'X-Api-Key': 'KdvVT7cA9sb4lgiqZy486w==qE7bwMX1zhQRnSmt' }
                });
                if (externalResponse.data.length > 0) {
                    setExercise(externalResponse.data[0]);
                } else {
                    const localResponse = await axios.post('http://localhost:4000/api/exercises', { name });
                    if (localResponse.data.length > 0) {
                        setExercise(localResponse.data[0]);
                    } else {
                        console.error('Exercise not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching exercise details:', error);
            }
        }

        async function fetchTrainersWhoLiked() {
          try {
              const usersResponse = await axios.get('http://localhost:4000/api/users');
              const trainersLiked = usersResponse.data
                  .filter(user => user.role === 'TRAINER' && user.likedExercises.includes(name))
                  .map(trainer => ({ username: trainer.username, id: trainer._id })); 
              setTrainersWhoLiked(trainersLiked);
          } catch (error) {
              console.error('Error fetching trainers:', error);
          }
      }

      async function fetchCurrentUser() {
        try {
            const userData = await client.account();
            setCurrentUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

        // Call fetchCurrentUser first, then other fetch functions
        fetchCurrentUser().then(() => {
          fetchDetails();
          fetchTrainersWhoLiked();
      });
  }, [name]);


  const toggleLike = async () => {
    if (!currentUser) {
        alert("You must be logged in to like or unlike exercises.");
        return;
    }

    try {
        const isLiked = currentUser.likedExercises.includes(name);
        if (isLiked) {
            await client.removeLikedExercise(currentUser._id, name);
        } else {
            await client.addLikedExercise(currentUser._id, name);
        }
        // Update currentUser state
        const updatedLikedExercises = isLiked
            ? currentUser.likedExercises.filter(e => e !== name)
            : [...currentUser.likedExercises, name];
        setCurrentUser({ ...currentUser, likedExercises: updatedLikedExercises });
    } catch (error) {
        console.error("Error updating like state:", error);
    }
};


    return (
        <div>
            <NavBar />
            <div className="wd-details-results">
                {exercise ? (
                    <div className="wd-exercise-detail-page">
                        <div className="mt-4 mb-3">
                            <h3>{exercise.name}</h3>
                            <hr className="details-divider" />
                        </div>
                        <div className="wd-exercise-info"> 
                      <p><span className="wd-info-category">Type: </span>{exercise.type}</p>
                      <p><span className="wd-info-category">Muscle: </span>{exercise.muscle}</p>
                      <p><span className="wd-info-category">Equipment: </span>{exercise.equipment}</p>
                      <p><span className="wd-info-category">Difficulty: </span>{exercise.difficulty}</p>
                      <p><span className="wd-info-category">Instructions: </span>{exercise.instructions}</p>
                       <h4>Trainers who liked this exercise:</h4>
                       <ul>
                                {trainersWhoLiked.map((trainer, index) => (
                                    <li key={index}>
                                        <Link to={`/profile/${trainer.id}`}>{trainer.username}</Link>
                                    </li>
                                ))}
                            </ul>
                            <button className='btn like-btn' onClick={toggleLike}>
                    {currentUser && currentUser.likedExercises.includes(name)
                        ? <FaHeart size={24} />
                        : <FaRegHeart size={24} />}
                </button>
                          
                            </div> 
                      
                    </div>
                ) : (
                    <p>Loading exercise details...</p>
                )}
            </div>
        </div>
    );
}

export default Details;
