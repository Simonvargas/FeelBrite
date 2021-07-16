import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginForm';
import styles from'./Navigation.module.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className={styles.login}>
        <Link to='/login'>
        <button className={styles.signBtn}>Sign in</button>
        </Link>
        </div>
      </>
    );
  }

  return (
    <ul>
      <div className={styles.homediv}>
        <Link exact to="/">
        <button class={styles.home}>Home</button>
        </Link>
        </div>
        {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;