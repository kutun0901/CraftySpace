import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getAllCategoriesThunk } from "../../store/categories";
import { addNewProductThunk } from "../../store/products";
import "./NewProduct.css"


function NewProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const categories = useSelector((state) => state.categories);

  const categoriesArr = Object.values(categories);

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [newImageFields, setNewImageFields] = useState([]); // new state to keep track of new image fields

  useEffect(() => {
    let e = {};
    if (!name.length > 0) e.emptyName = "Name is required";
    if (!images.length && !newImageFields.length ) e.emptyImages = "At least one image is required";
    if (newImageFields[0] === "" ) e.emptyImages = "At least one image is required";
    if (!description.length > 0)
      e.emptyDescription = "Description is required";
    if (!quantity.length > 0 || quantity < 1)
      e.emptyQuantity = "Quantity is required";
    if (!price.length > 0 || price < 1)
      e.emptyPrice = "Price is required and must be greater than 0";
    if (!category.length > 0) e.emptyCategory = "Category is required";
    setErrors(e);
  }, [name, description, quantity, price, category, images, newImageFields]);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, sessionUser]);

  if (!sessionUser) return <Redirect to='/' />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    let newImages = [];
    newImageFields.forEach((field) => {
      if (field.length > 0) newImages.push(field);
    });

    const newProduct = {
      name,
      description,
      category_id: category,
      price,
      quantity,
      image_urls: newImages,
    };

    if (Object.values(errors).length === 0) {
      const data = await dispatch(addNewProductThunk(newProduct));
      if (data) {
        history.push(`/products/${data.id}`);
      }
    }
  };

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

  return (
    <div className="new-product-container new-product-page">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="new-product-text-input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {hasSubmitted && errors.emptyName && (
            <div className="error">{errors.emptyName}</div>
          )}
        </div>
        <div className="form-group">
          <label>Images:</label>
          {images.map((image, index) => (
            <div key={index}>
              <input
                className="new-product-text-input"
                type="text"
                value={image}
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  setImages(newImages);
                }}
              />
            </div>
          ))}
          {newImageFields.map((field, index) => (
            <div key={index}>
              <input
                className="new-product-text-input"
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
          <label>Description:</label>
          <textarea
          className="new-product-text-input"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {hasSubmitted && errors.emptyDescription && (
            <div className="error">{errors.emptyDescription}</div>
          )}
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {hasSubmitted && errors.emptyQuantity && (
            <div className="error">{errors.emptyQuantity}</div>
          )}
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {hasSubmitted && errors.emptyPrice && (
            <div className="error">{errors.emptyPrice}</div>
          )}
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            id="category"
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
          {hasSubmitted && errors.emptyCategory && (
            <div className="error">{errors.emptyCategory}</div>
          )}
        </div>
        <div className="submit-container">
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
