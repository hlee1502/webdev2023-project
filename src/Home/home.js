//import { Provider } from "react-redux";
import {Routes, Route, Navigate} from "react-router";
import NavBar from "../NavBar/navbar.js"
import IntroImage from "./introimage.js";
import './home.css';
import SmallLibrary from "./smlibrary.js";
import { useEffect, useState } from "react";
import * as client from "../Users/client.js";

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await client.account();
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return(
        <div>
            <NavBar/>
            <IntroImage user={user} />
            <div>
                <PartnersList />
            </div>
        </div>
    );
}

export default Home;