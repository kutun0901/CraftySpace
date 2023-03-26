import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getAllCategoriesThunk } from "../../store/categories";
import { getSingleProduct, getUserProductsThunk, updateProductThunk } from "../../store/products";
import './UpdateProduct.css'


function UpdateProduct() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const categories = useSelector((state) => state.categories);
    const product = useSelector((state) => state.products.userProducts[id])

    const categoriesArr = Object.values(categories);

    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newImageFields, setNewImageFields] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/products/${id}`);
            if (res.ok) {
                const product = await res.json();
                setName(product.name);
                setImages(product.images);
                setDescription(product.description);
                setQuantity(product.quantity);
                setPrice(product.price);
                setCategory(product.category_id);
            } else {
                return (<div>Product not available</div>)
            }
        };

        fetchData();
    }, [id, history]);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllCategoriesThunk());
            dispatch(getUserProductsThunk())
        }
    }, [dispatch, sessionUser]);

    useEffect(() => {
        let e = {};
        if (!name || !name.length) e.emptyName = "Name is required";
        if ((!images || !images.length) && (!newImageFields || !newImageFields.length))
            e.emptyImages = "At least one image is required";
        if (!description || !description.length)
            e.emptyDescription = "Description is required";
        if (!quantity || quantity < 1)
            e.emptyQuantity = "Quantity is required and must be greater than 0";
        if (!price || price < 1)
            e.emptyPrice = "Price is required and must be greater than 0";
        if (!category) e.emptyCategory = "Category is required";
        setErrors(e);
    }, [name, description, quantity, price, category, images, newImageFields]);


    if (!sessionUser) return <Redirect to='/' />;
    if (!product) return (<div style={{ marginTop: '30px', fontSize: '20px' }}>Sorry!!! product not available</div>)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        let newImages = [];
        newImageFields.forEach((field) => {
            if (field.length > 0) newImages.push(field);
        });

        const updatedProduct = {
            name,
            description,
            category_id: category,
            price,
            quantity,
            image_urls: [...images, ...newImages],
        };

        if (Object.values(errors).length === 0) {
            const data = await dispatch(updateProductThunk(id, updatedProduct));

            if (data) {
                history.push(`/products/${id}`);
            }
        }
    }

    const handleAddNewImageField = () => {
        setNewImageFields([...newImageFields, ""]);
    };

    const handleNewImageFieldChange = (index, value) => {
        const newFields = [...newImageFields];
        newFields[index] = value;
        setNewImageFields(newFields);
    };

    const handleRemoveNewImageField = (index) => {
        const newFields = [...newImageFields];
        newFields.splice(index, 1);
        setNewImageFields(newFields);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <div className="update-product-container update-product-page">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {hasSubmitted && errors.emptyName && (<div className="error">{errors.emptyName}</div>)}
                </div>
                <div className="form-group">
                    <label>
                        Images:
                    </label>
                    {images.map((image, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => {
                                    const newImages = [...images];
                                    newImages[index] = e.target.value;
                                    setImages(newImages);
                                }}
                            />
                            <button type="button" onClick={() => handleRemoveImage(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    {newImageFields.map((field, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={field}
                                onChange={(e) => handleNewImageFieldChange(index, e.target.value)}
                            />
                            <button type="button" onClick={() => handleRemoveNewImageField(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddNewImageField}>
                        Add New Image
                    </button>
                    {hasSubmitted && errors.emptyImages && (
                        <div className="error">{errors.emptyImages}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>
                        Description:
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {hasSubmitted && errors.emptyDescription && (<div className="error">{errors.emptyDescription}</div>)}
                </div>
                <div className="form-group">
                    <label>
                        Quantity:
                    </label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    {hasSubmitted && errors.emptyQuantity && (<div className="error">{errors.emptyQuantity}</div>)}
                </div>
                <div className="form-group">
                    <label>
                        Price:
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {hasSubmitted && errors.emptyPrice && (<div className="error">{errors.emptyPrice}</div>)}
                </div>
                <div className="form-group">
                    <label>
                        Category:
                    </label>
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
                    {hasSubmitted && errors.emptyCategory && (<div className="error">{errors.emptyCategory}</div>)}
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateProduct;
