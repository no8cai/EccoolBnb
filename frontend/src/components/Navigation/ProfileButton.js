// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deleteUserSpots } from "../../store/spot";
import { deleteUserReviews } from "../../store/review";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history=useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(deleteUserSpots());
    dispatch(deleteUserReviews());
    closeMenu();
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="menubutton">
        <i className="fas fa-bars"/>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="topleftmenulist">{user.username}</div>
            <div className="topleftmenulist">{user.firstName} {user.lastName}</div>
            <div className="topleftmenulist">{user.email}</div>
            <div className="topleftmenulist live"><NavLink to={`/hosting/booking`} className="topleftlink top">My Trips</NavLink></div>
            <div className="topleftmenulist live"><NavLink to={`/hosting`} className="topleftlink top">Manage Listings</NavLink></div>
            <div className="topleftmenulist live"><NavLink to={`/hosting/reviews`} className="topleftlink top">Manage Reviews</NavLink></div>
            <div onClick={logout} className="topleftmenulist logout live">Log Out</div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemStyle={"topleftmenulist top out"}
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemStyle={"topleftmenulist logout out"}
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;