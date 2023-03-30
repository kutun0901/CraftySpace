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

    useEffect(() => {
        dispatch(getAllProductsThunk())
        dispatch(getAllCategoriesThunk())
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
            <div className="about-us">
                <h4>What is CraftySpace</h4>
                <p className="about-us-p">Read our wonderfully weird story</p>
                <div className="introduction">
                    <div>
                        <p>Our website is an Etsy clone, offering a wide selection of items ranging from handmade crafts to licensed
                            merchandise. a unique online shopping experience where you can find all kinds of merchandise inspired by Harry Porter magical world.</p>
                    </div>
                    <div>
                        <p>
                            We understand the passion that Harry Potter fans have for the series, and our marketplace is designed to provide a one-stop-shop for all your wizarding needs.
                        </p>
                    </div>
                    <div>
                        <p>
                            Our goal is to create a community of like-minded individuals who share a love for Harry Potter, and we strive to offer products that are of high quality and affordable.
                        </p>
                    </div>
                </div>
            </div>
            <div className="blue-div">
                    <p><i className="fa-solid fa-seedling"></i> Etsy clone 2023</p>
            </div>

        </div>

    )
}

export default LandingPage
