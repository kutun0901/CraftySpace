import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
	  <nav className='navigation-container'>
		<NavLink exact to='/' className='navigation-logo'>
		  <i className="fa-solid fa-hat-wizard"></i>
		  CraftySpace
		</NavLink>
		<div>
		  <form className='search-form'>
			<input type='text' placeholder='Search' />
			<button type='submit'>Go</button>
		  </form>
		</div>
		{isLoaded && (
		  <ul className='navigation-links'>
			{sessionUser && (
			  <>
				<li>
				  <NavLink exact to='/' className='store'>
					<i className="fa-solid fa-store"></i>
				  </NavLink>
				</li>
				<li>
				  <NavLink exact to='/' className='cart'>
					<i className="fa-solid fa-cart-shopping"></i>
				  </NavLink>
				</li>
			  </>
			)}
			<li>
			  <ProfileButton user={sessionUser} />
			</li>
		  </ul>
		)}
	  </nav>
	)
  }

export default Navigation;
