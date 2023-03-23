import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllProductsThunk } from '../../store/products'

function LandingPage() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.allProducts)
    const sessionUser = useSelector(state => state.session.user)

    const productsArr = Object.values(products)


    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [dispatch])

    return (
        <div>
            <div className="header-container">
                {sessionUser ? (
                    <div className="welcome">
                        <h1>
                            welcome back, {sessionUser ? sessionUser.firstName : null}
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
            <div className="products-container">
                {productsArr.map((product) => (
                    <div key={product.id} className="product">
                        <NavLink to={`/products/${product.id}`}>
                        <img src={product.images[0]} alt={product.title} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <p>{product.description}</p>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>

    )
}


export default LandingPage
