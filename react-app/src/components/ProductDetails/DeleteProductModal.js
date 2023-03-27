import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteProductThunk } from "../../store/products";
import "./DeleteProductModal.css"
function DeleteProductModal({ product }) {
    const { closeModal }  = useModal();
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const confirmDelete = async () => {
        const data = await dispatch(deleteProductThunk(product.id))
        if (data) {
            setErrors(data);
        } else {
            closeModal()
        }
    }

    return (
        <div className="delete_confirmation_modal_div">
            <h2 className="delete_confirmation_modal_title">Delete Product</h2>
            <p className="delete_confirmation_modal_info">Are you sure you want to delete this product from your listing?</p>
            <ul className="delete_confirmation_modal_errors_list">
                {errors.map((error,idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="delete_confirmation_modal_button_container">
                <button onClick={closeModal} className="delete_confirmation_modal_cancel_button">Cancel</button>
                <button onClick={confirmDelete} className="delete_confirmation_modal_confirm_button">Delete</button>
            </div>
        </div>
    )
}

export default DeleteProductModal
