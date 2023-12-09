import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NavBar from "../NavBar/navbar.js"
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import './searchResults.css';

const determineSearchParam = (query) => {
  const types = ['cardio', 'olympic_weightlifting', 'plyometrics', 'powerlifting', 'strength', 'stretching', 'strongman'];
  const muscles = ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'];
  const difficulties = ['beginner', 'intermediate', 'expert'];

  if (types.includes(query.toLowerCase())) {
    return `type=${query}`;
  } else if (muscles.includes(query.toLowerCase())) {
    return `muscle=${query}`;
  } else if (difficulties.includes(query.toLowerCase())) {
    return `difficulty=${query}`;
  } else {
    return `name=${query}`;
  }
};

function SearchResults() {
  const [results, setResults] = useState([]);
  const [isLiked, setLiked] = useState(false);
  const { query } = useParams(); 

  const handleLike = () => {
    setLiked(!isLiked);
  };

  useEffect(() => {
    const searchParam = determineSearchParam(query);
    const fetchData = async () => {
      try {
        const externalResponse = await axios.get(`https://api.api-ninjas.com/v1/exercises?${searchParam}`, {
          headers: { 'X-Api-Key': 'KdvVT7cA9sb4lgiqZy486w==qE7bwMX1zhQRnSmt' }
        });

        const localResponse = await axios.post('http://localhost:4000/api/exercises', {name: query});

        setResults([...externalResponse.data, ...localResponse.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <NavBar/>
      <div className="search-results">
        <div className="mt-4 mb-2">
          <h2>Search Results for: "{query}"</h2>
          <hr className="header-divider"/> 
        </div>

        {results.length > 0 ? (
          <div className="results-container">
            <ul className="list-group d-inline-block text-truncate">
              {results.map((result, index) => (
                <div className='row align-items-center'>
                  <div className='col-10'>
                    <Link key={index} to={`/details/${encodeURIComponent(result.name)}`} className="result-link p-0">
                        <li className="list-group-item">
                          <div className='text-truncate'>
                            <span className="wd-exercise-name">{result.name}</span> <br/>
                            <span className="wd-exercise-description">Type: {result.type}; Muscle: {result.muscle}; Equipment: {result.equipment}; Difficulty: {result.difficulty};</span>
                          </div>
                          <hr className="results-divider"/>
                        </li>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <button className='btn btn-outline-secondary'>
                      <FaHeart/>
                    </button>
                  </div>
                </div>
              ))} 
            </ul>
          </div>
        ) : (
          <div className="no-results-message">
            <p>No results found for "{query}". Try searching for different terms like 'cardio', 'biceps', or 'beginner'.</p>
            <p>Examples of valid searches:</p>
            <ul>
              <li>Name of exercise (e.g., 'squat')</li>
              <li>Exercise type (e.g., 'strength', 'cardio')</li>
              <li>Muscle group (e.g., 'quadriceps', 'abdominals')</li>
              <li>Difficulty level (e.g., 'beginner', 'expert')</li>
            </ul>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default SearchResults;
