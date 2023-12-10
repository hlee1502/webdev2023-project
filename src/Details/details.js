import {Routes, Route, Navigate} from "react-router";
import NavBar from "../NavBar/navbar.js"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import "./details.css";

function Details() {
    const {name} = useParams();
    const [exercise, setExercise] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
          try {
            const externalResponse = await axios.get(`https://api.api-ninjas.com/v1/exercises?name=${name}`, {
              headers: { 'X-Api-Key': 'KdvVT7cA9sb4lgiqZy486w==qE7bwMX1zhQRnSmt' }
            });
            if (externalResponse.data.length > 0) {
              setExercise(externalResponse.data[0]);
              return;
            }
            const localResponse = await axios.post('http://localhost:4000/api/exercises', { name });
            if (localResponse.data.length > 0) {
              setExercise(localResponse.data[0]);
              return;
            } else {
              console.error('Exercise not found');
            }
          } catch (error) {
            console.error('Error fetching exercise details:', error);
          }
        };

      fetchDetails();
    }, [name]);

  return (
    <div>
      <NavBar/>
      <div className="wd-deatils-results">
        {exercise ? (
          <div className="wd-exercise-detail-page">
            <div className="mt-4 mb-3">
              <h3>{exercise.name}</h3>
              <hr className="details-divider"/>
            </div>
            <div className="wd-exercise-info"> 
              <p><span className="wd-info-category">Type: </span>{exercise.type}</p>
              <p><span className="wd-info-category">Muscle: </span>{exercise.muscle}</p>
              <p><span className="wd-info-category">Equipment: </span>{exercise.equipment}</p>
              <p><span className="wd-info-category">Difficulty: </span>{exercise.difficulty}</p>
              <p><span className="wd-info-category">Instructions: </span>{exercise.instructions}</p>
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