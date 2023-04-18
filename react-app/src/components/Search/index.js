import { useDispatch, useSelector } from "react-redux";


function Search(keyword) {
    const dispatch = useDispatch();
    const resultsObj = useSelector(state => state.search);

    const results = Object.values(resultsObj);



    return (
        <div>
            <h3 className="shop-ours">Your search results</h3>
            <div className="products-container">
                {results.map((product) => (
                    <div key={product.id} className="product">
                        <NavLink to={`/products/${product.id}`}>
                            <div className="image-container">
                                <img src={product.images ? product.images[0] : null} alt={product.title} />
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
    )
}

export default Search;
