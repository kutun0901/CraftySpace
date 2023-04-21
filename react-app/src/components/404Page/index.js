import "./404Page.css";
import { NavLink } from "react-router-dom/react-router-dom";

function PageNotFound() {
    return (
        <div className="page-not-found-wrapper">
            <div className="page-not-found-content-div">
                <h2>Uh oh!</h2>
                <h4>Sorry, the page you were looking for was <strong>not found</strong>.</h4>
                <span>
                    <NavLink>
                        <h4><i className="fa-solid fa-arrow-left"></i>Go back to CraftySpace.com</h4>
                    </NavLink>
                </span>
                <span>
                    <NavLink>
                        <h4>Check out our <a href="https://github.com/kutun0901/CraftySpace" rel="noreferrer" target="_blank">Github repository</a> for help.<i className="fa-solid fa-arrow-right"></i></h4>
                    </NavLink>
                </span>
            </div>
        </div>
    )
}

export default PageNotFound;
