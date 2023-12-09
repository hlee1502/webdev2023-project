import {Routes, Route, Navigate} from "react-router";
import { Link } from "react-router-dom";
import data from "../Database/exercises.json";
import "./libcontent.css";
import React, { useState } from 'react';

function LibContent() {
    const exercises = data;

    const [category, setCategory] = useState('All');

    const filterExercises = 
        category === 
        'All' ? exercises : exercises.filter(exercise => exercise.category.toLowerCase() === category.toLowerCase());

    return(
        <div className="wd-libcontent mt-3 mb-3">
            <h1>Library</h1>
            <hr className="header-divider"/> 
            <div className="d-flex mt-3 mb-3">
                <button className={`btn btn-outline-secondary ${category === 'All' ? 'active' : ''}`} 
                    onClick={() => setCategory('All')}>All</button>
                <button className={`btn btn-outline-secondary ${category === 'Upper' ? 'active' : ''}`}  
                    onClick={() => setCategory('Upper')}>Upper</button>
                <button className={`btn btn-outline-secondary ${category === 'Lower' ? 'active' : ''}`}  
                    onClick={() => setCategory('Lower')}>Lower</button>
                <button className={`btn btn-outline-secondary ${category === 'Abs' ? 'active' : ''}`}  
                    onClick={() => setCategory('Abs')}>Abs</button>
            </div>
            <div className="d-flex">
                <div className="row row-cols-md-5 g-2">
                    {filterExercises.map((exercise) => (
                        <div className="col mb-4">
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
        </div>
    );
}

export default LibContent;