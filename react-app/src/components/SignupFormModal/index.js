import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			if (password.length < 6) {
				setErrors(["Password must be at least 6 characters long"]);
			} else {
				const data = await dispatch(signUp(email, firstName, password));
				if (data) {
					setErrors(data);
				} else {
					closeModal();
				}
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-modal-container">
			<h1 className="signup-modal-heading">Sign Up</h1>
			<form className="signup-modal-form" onSubmit={handleSubmit}>
				<ul className="signup-modal-errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="signup-modal-label">
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="signup-modal-input"
						required
					/>
				</label>
				<label className="signup-modal-label">
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="signup-modal-input"
						required
					/>
				</label>
				<label className="signup-modal-label">
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="signup-modal-input"
						required
					/>
				</label>
				<label className="signup-modal-label">
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="signup-modal-input"
						required
					/>
				</label>
				<button type="submit" className="signup-modal-button">
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
