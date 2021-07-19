import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import styles from './Navigation.module.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/login')
  };

  return (
    <>
     <div className={styles.dropdown}>
              <i className="icon fas fa-user-circle fa-4x"></i>
            <div className={styles.dropdownContent}>
              <NavLink className={styles.links} to='/profile'>Profile</NavLink>
              <NavLink className={styles.links} to='/login' onClick={logout}>Log Out</NavLink>
              
              </div>
      </div>

    </>
  );
}

export default ProfileButton;
