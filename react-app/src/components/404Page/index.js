import "./404Page.css";
import { NavLink } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="page-not-found-wrapper">
            <div className="page-not-found-content-div">
                <h2>Uh oh!</h2>
                <h4>Sorry, the page you were looking for was <strong>not found</strong>.</h4>
                <span>
                    <NavLink to="/">
                        <h4><i className="fa-solid fa-arrow-left"></i>Go back to CraftySpace.com</h4>
                    </NavLink>
                </span>
                <span>
                        <a href="https://github.com/kutun0901/CraftySpace" rel="noreferrer" target="_blank"><h4>Check out our Github repository for help. <i className="fa-solid fa-arrow-right"></i></h4></a>
                </span>
            </div>
        </div>
    )
}

export default PageNotFound;
