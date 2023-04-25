import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import { getUserProductsThunk } from "../../store/products";
import DeleteProductModal from "../ProductDetails/DeleteProductModal";
import OpenModalButton from "../OpenModalButton";
import './UserListing.css'
import Loading from "../Loading";

function UserListing() {
    const sessionUser = useSelector(state => state.session.user)
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const userProductsArr = Object.values(userProducts)

    useEffect(() => {
        if (sessionUser) {
            dispatch(getUserProductsThunk())
                .then(() => setIsLoaded(true))
        }
    }, [dispatch, sessionUser])

    if (!sessionUser) return <Redirect to='/' />

    return (
        <>
            {isLoaded ? (
                <div className="user-listing">
                    <div className="user-listing-header">
                        <h1>Stock your shop</h1>
                        <p>Keep in mind: the more you have, the more likely you'll be discovered.</p>
                        <Link to="/products/current/new">
                            <button className="add-listing-button">Add a Listing</button>
                        </Link>
                    </div>
                    <ul className="store-listing">
                        {userProductsArr.map(product => (
                            <li key={product.id} className="store-listing-item">
                                <NavLink to={`/products/${product.id}`}>
                                    <div className="item-details">
                                        <div>
                                            <img src={product.images ? product.images[0] : null} alt={product.title} />
                                        </div>
                                        <div>
                                            <h4>{product.name}</h4>
                                            <p>{product.description}</p>
                                            <p className="item-price">$ {product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <div className="buttons-container">
                                    <div>
                                        <NavLink to={`/products/${product.id}/edit`}>
                                            <button className="update-button">Update</button>
                                        </NavLink>
                                        <div className="delete-listing-container">
                                            <OpenModalButton modalComponent={<DeleteProductModal product={product} />} buttonText="Delete" className="delete-listing-button" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : <Loading />}
        </>
    )
}

export default UserListing
