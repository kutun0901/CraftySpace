import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import Loading from "../Loading";


function CategoryProducts() {
    const { id } = useParams();
    const allProducts = Object.values(useSelector(state => state.products.allProducts));
    // console.log("==========>", allProducts)
    const [isLoaded, setIsLoaded] = useState(false);

    const placeholderImage = 'https://papapita.com/file/2020/02/Image-Coming-Soon-Placeholder.jpg';

    const categoryId = parseInt(id)
    const categoryProducts = allProducts.filter(product => product.categoryId === categoryId);
    // console.log(categoryProducts);
    useEffect(() => {
      setIsLoaded(true);
    }, [categoryProducts]);

    return (
        <>
        {isLoaded ? (
            <div className="search-result">
            <h3 className="shop-ours">Your search results:</h3>
            <div className="products-container">
                {categoryProducts.map((product) => (
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
        ) : <Loading />}
        </>
    )

  }

export default CategoryProducts;
