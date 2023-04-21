import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchResultThunk, resetSearchResult } from '../../store/search';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(resetSearchResult()); // Reset the search results state
    dispatch(getSearchResultThunk(searchKeyword)); // Fetch new search results
    history.push(`/search/${searchKeyword}`);
  }

  return (
    <nav className='navigation-container'>
      <NavLink exact to='/' className='navigation-logo'>
        <i className="fa-solid fa-wand-sparkles"></i>
        CraftySpace
      </NavLink>
      <div>
        <form className='search-form' onSubmit={handleSearch}>
          <input type='text' placeholder='Search' onChange={(e) => setSearchKeyword(e.target.value)} />
          <button type='submit'>Go</button>
        </form>
      </div>
      {isLoaded && (
        <ul className='navigation-links'>
          {sessionUser && (
            <>
              <li>
                <NavLink exact to='/products/current' className='store'>
                  <i className="fa-solid fa-store"></i>
                </NavLink>
              </li>
              <li>
                <NavLink exact to='/cart' className='cart'>
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
