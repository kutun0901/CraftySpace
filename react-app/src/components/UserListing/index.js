import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserProductsThunk } from "../../store/products";

function UserListing () {
    const sessionUser = useSelector(state => state.session.user)
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const userProductsArr = Object.values(userProducts)

    useEffect(() => {
        if (sessionUser) {
            dispatch(getUserProductsThunk())
        }
    }, [dispatch, sessionUser])

    if (!sessionUser) return null

    return (
        <>
            <div className="user-listing-header">
            <h1>Stock your shop</h1>
            <p>
                Keep in mind: the more you have, the more likely you'll be discovered.
            </p>
            </div>

            <ul>
                {userProductsArr.map(product => (
                    <li key={product.id}>
                        <NavLink to={`/products/${product.id}`}>
                            {product.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserListing
