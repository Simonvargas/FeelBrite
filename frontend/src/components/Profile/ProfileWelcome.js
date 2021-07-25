import React from "react";
import {useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';

import styles from './Profile.module.css'

function ProfileWelcome() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <>
      <div className={styles.profileImageContainer}>
        <img
          alt={`img`}
          className={styles.profileImage}
          src={
            "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"
          }
        ></img>
      </div>
      <div>
        <h3>Welcome back, {sessionUser?.username}!</h3>
        <div>
          <h4>Username: {sessionUser?.username}</h4>
          <h4>Email: {sessionUser?.email}</h4>
        </div>
      </div>
    </>
  );
}
export default ProfileWelcome;