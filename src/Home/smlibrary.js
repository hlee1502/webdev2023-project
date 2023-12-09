import { Link } from "react-router-dom";
import data from "../Database/exercises.json";
import "./smlibrary.css";
import React, { useState } from 'react';

function SmallLibrary() {
    const exercises = data;
    const [category, setCategory] = useState('All');

    const filterExercises = 
        category === 'All' ? exercises : exercises.filter(exercise => exercise.category.toLowerCase() === category.toLowerCase());

    return (
        <div className="wd-home-library mb-5">
            <h1>Library</h1>
            <hr className="header-divider"/> 
            <div className="d-flex mb-2">
                <button className={`btn btn-outline-secondary ${category === 'All' ? 'active' : ''}`} 
                        onClick={() => setCategory('All')}>All</button>
                <button className={`btn btn-outline-secondary ${category === 'Upper' ? 'active' : ''}`} 
                    onClick={() => setCategory('Upper')}>Upper</button>
                <button className={`btn btn-outline-secondary ${category === 'Lower' ? 'active' : ''}`} 
                    onClick={() => setCategory('Lower')}>Lower</button>
                <button className={`btn btn-outline-secondary ${category === 'Abs' ? 'active' : ''}`} 
                    onClick={() => setCategory('Abs')}>Abs</button>
            </div>
            <div className="position-relative overflow-auto d-flex">
                {filterExercises.map((exercise) => (
                    <div>
                        <div className="card">
                            <img src={exercise.image} className="card-img-top wd-card-img"/>
                            <div className="card-body">
                                <p className="card-title text-truncate">{exercise.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SmallLibrary;
