// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='bar'>
      <div className='logo'>
        <NavLink className={'toplogo'} exact to="/"><i className='fas fa-umbrella-beach'/>ECcoolBnb</NavLink>
      </div>
      {isLoaded && (
        <div className='menu'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;