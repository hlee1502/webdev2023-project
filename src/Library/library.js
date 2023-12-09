import NavBar from "../NavBar/navbar.js"
import "./library.css";
import LibContent from "./libcontent.js";

function Library() {
    return(
        <div>
            <NavBar/>
            <div className="wd-library-content">
                <LibContent/>
            </div>
        </div>
    );
}

export default Library;