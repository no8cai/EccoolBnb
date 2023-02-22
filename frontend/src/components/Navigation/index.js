// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router-dom';
import './Navigation.css';


function Navigation({ isLoaded }){
  
  const sessionUser = useSelector(state => state.session.user);
  const [searchitem, setSearchitem] = useState("");
  const history=useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchitem}`)
  }

  return (
    <div className='bar'>
      <div className='logo'>
        <NavLink className={'toplogo'} exact to="/"><i className='fas fa-umbrella-beach'/>ECcoolBnb</NavLink>
      </div>

      <div className="search-container">
      <form className='form-input' onSubmit={handleSubmit}>
      <input 
           type="text" 
           placeholder="Search key word" 
           onChange={(e) => setSearchitem(e.target.value)}
           value={searchitem}
           name="search"/>
      <button type="submit"><i className="fa fa-search"></i></button>
      </form>
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