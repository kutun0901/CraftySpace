import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import noResults from "../../asset/-unsuccessful-state-feedback.jpg"
import "./Search.css"

function Search() {
    const resultsObj = useSelector(state => state.search);
    const placeholderImage = 'https://papapita.com/file/2020/02/Image-Coming-Soon-Placeholder.jpg';
    const results = Object.values(resultsObj);
    const [isLoaded, setIsLoaded] = useState(false);


    // Simulate asynchronous data loading with useEffect
    useEffect(() => {
        // Simulated API call with setTimeout
        setTimeout(() => {
            setIsLoaded(true); // Set isLoaded to true after 1 second
        }, 1000);
    }, []);

    // Render loading component while data is being loaded
    if (!isLoaded) {
        return <Loading />;
    }

    // Render custom message when there are no search results
    if (results.length === 0) {
        return (
            <div className="no-results">
                <img src={noResults} alt="No Results found"></img>
                <h3 className="shop-ours">Sorry, we couldn't find what you looking for</h3>
                <p>Try searching for something else instead?</p>
            </div>
        );
    }

    // Render product cards when there are search results
    return (
        <div className="search-result">
            <h3 className="shop-ours">Your search results:</h3>
            <div className="products-container">
                {results.map((product) => (
                    <div key={product.id} className="product">
                        <NavLink to={`/products/${product.id}`}>
                            <div className="image-container">
                                <img
                                    src={product.images ? product.images[0] : placeholderImage}
                                    alt={product.title}
                                    onError={(e) => {
                                        e.target.src = placeholderImage;
                                    }}
                                />
                                <p className="price">${product.price.toFixed(2)}</p>
                            </div>
                            <h4>{product.name}</h4>
                            {product.avgRating ? (
                                <p><i className="fa-solid fa-star"></i> {product.avgRating.toFixed(1)}</p>
                            ) : (
                                <p><i className="fa-solid fa-star"></i> No ratings yet</p>
                            )}
                            <p>{product.description}</p>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
