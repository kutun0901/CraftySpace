import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from '../../store/products'
import "./LandingPage.css"


function LandingPage() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.allProducts)
    const categories = useSelector(state => state.categories)
    const sessionUser = useSelector(state => state.session.user)

    const categoriesArr = Object.values(categories)

    const productsArr = Object.values(products)

    useEffect(async () => {
        await dispatch(getAllProductsThunk())
        await dispatch(getAllCategoriesThunk())
    }, [dispatch])

    return (
        <div>
            <div className="header-container">
                {sessionUser ? (
                    <div className="welcome">
                        <h1>
                            Welcome back, {sessionUser ? sessionUser.firstName : null}
                        </h1>
                    </div>

                ) : (
                    <div className="welcome">
                        <h1>
                            Welcome to CraftySpace! We're so glad you're here.
                        </h1>
                    </div>
                )

                }

            </div>
            <div className="categories-container">
                {categoriesArr.map((category) => (
                    <div key={category.id} className="category">
                        <NavLink to="/">
                            <h3>{category.name}</h3>
                        </NavLink>
                    </div>
                ))}
            </div>
            <div className="products-container">
                {productsArr.map((product) => (
                    <div key={product.id} className="product">
                        <NavLink to={`/products/${product.id}`}>
                            <img src={product.images ? product.images[0] : null} alt={product.title} />
                            <h4>{product.name}</h4>
                            <p><i className="fa-solid fa-star"></i> {product.avgRating.toFixed(1)} </p>
                            <p>{product.price.toFixed(2)}</p>
                            <p>{product.description}</p>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default LandingPage
