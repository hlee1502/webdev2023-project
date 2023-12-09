import './introimage.css'; 
import workoutImage from '../images/front-page.jpg'; 
import introImage1 from "../images/introimage1.jpg";
import logoImage from '../images/logo.png';
import blueLogo from '../images/bluelogo.png';
import { LuSearch } from "react-icons/lu";

function IntroImage({ user }) {
    return(
        <div className="front-page mb-5" 
            style={{ backgroundImage: `url(${introImage1})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '600px' }}>
            <div className='wd-image-content'>
                <div className='wd-image-title'>
                        <img className='wd-image-logo' src={blueLogo} alt="Logo" style={{ width: '68px' }} /> 
                        <span>Fitness Lab</span>
                </div> 
                <div className='wd-image-heading'>Your Workout Tracking Starts Here!</div>
                {user && <div className='wd-welcome-message'>Welcome back {user.username}</div>}
            </div>
        </div>
    );
}

export default IntroImage;