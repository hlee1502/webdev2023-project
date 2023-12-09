import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import Home from './Home/home.js';
import Library from './Library/library';
import Tracker from './Tracker/tracker';
import Login from './Users/Login/login';
import AboutUs from './AboutUs/aboutus';
import Profile from './Users/Profile/profile';
import SearchResults from './SearchResults/searchResults';
import Register from './Users/Register/register';
import Account from './Users/Account/account';
import Details from './Details/details';
import PublicProfile from './Users/Profile/publicProfile.js';
import MyExercises from './MyExercises/myExercises';

function App() {
  return (
    <HashRouter>
      <div> 
        <Routes>
          <Route path="/" element={<Navigate to="/Home"/>}/>
          <Route path="/Home/*" element={<Home/>}/>
          <Route path="/AboutUs/*" element={<AboutUs/>}/>
          <Route path="/Tracker/*" element={<Tracker/>}/>
          <Route path="/Library/*" element={<Library/>}/>
          <Route path="/Login/*" element={<Login/>}/>
          <Route path="/Profile/*" element={<Profile/>}/>
          <Route path="/search/:query" element={<SearchResults/>}/>
          <Route path="/Register/*" element={<Register/>}/>
          <Route path="/Account/*" element={<Account/>}/>
          <Route path="/Details/:name" element={<Details/>}/>
          <Route path="/Profile/:profileId" element={<PublicProfile />} />
          <Route path="/MyExercises/*" element={<MyExercises/>}/>

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;