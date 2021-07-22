// import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import styles from './Navigation.module.css'
import {useSelector } from 'react-redux'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
     <div className={styles.dropdown}>

             
            <div className={styles.loginContent}>
              <NavLink className={styles.links} to='/profile'> Hi, {sessionUser.username}! ||  </NavLink>
              <NavLink className={styles.links} to='/' onClick={logout}> Log Out</NavLink>
              </div>
              
      </div>
      

    </>
  );
}

export default ProfileButton;
