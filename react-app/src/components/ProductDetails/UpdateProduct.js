import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllCategoriesThunk } from "../../store/categories";
import { getSingleProductThunk, getUserProductsThunk, updateProductThunk } from "../../store/products";

function UpdateProduct() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const categories = useSelector((state) => state.categories);
    const product = useSelector((state) => state.products.userProducts[id])

    console.log(product);

    if (!sessionUser) history.push('/')

    const categoriesArr = Object.values(categories);

    const [name, setName] = useState(product?.name);
    const [images, setImages] = useState(product?.images);
    const [description, setDescription] = useState(product?.description);
    const [quantity, setQuantity] = useState(product?.quantity);
    const [price, setPrice] = useState(product?.price);
    const [category, setCategory] = useState(product?.category);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllCategoriesThunk());
            dispatch(getUserProductsThunk());
            dispatch(getSingleProductThunk(id));
        }
    }, [dispatch, sessionUser, id]);

    useEffect(() => {
        let e = {};
        if (!(name ?? '').length > 0) e.emptyName = "Name is required";
        if (!(images ?? []).length > 0) e.emptyImages = "At least one image is required";
        if (!(description ?? '').length > 0)
            e.emptyDescription = "Description is required";
        if (!(quantity ?? '').length > 0 || quantity < 1) e.emptyQuantity = "Quantity is required";
        if (!(price ?? '').length > 0 || price < 1) e.emptyPrice = "Price is required and must be greater than 0";
        if (!(category ?? '').length > 0) e.emptyCategory = "Category is required";
        setErrors(e);
    }, [name, description, quantity, price, category, images]);



    if (!sessionUser) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        let newImages = []
        if (images) newImages.push(images)


        const product = {
            name,
            description,
            category_id: category,
            price,
            quantity,
            image_urls: newImages,
        };

        if (Object.values(errors).length === 0) {
            const data = await dispatch(updateProductThunk(id, product));
            console.log(product.id);

            if (data) {
                history.push(`/products/${product.id}`);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {hasSubmitted && errors.emptyName && <div>{errors.emptyName}</div>}
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    {hasSubmitted && errors.emptyImages && <div>{errors.emptyImages}</div>}
                    <label>
                        Images:
                        <input
                            type="text"
                            value={images}
                            onChange={(e) => setImages(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    {hasSubmitted && errors.emptyDescription && <div>{errors.emptyDescription}</div>}
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    {hasSubmitted && errors.emptyQuantity && <div>{errors.emptyQuantity}</div>}
                    <label>
                        Quantity:
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    {hasSubmitted && errors.emptyPrice && <div>{errors.emptyPrice}</div>}
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    {hasSubmitted && errors.emptyCategory && <div>{errors.emptyCategory}</div>}
                    <label>
                        Category:
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select a category</option>
                            {categoriesArr.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateProduct;
