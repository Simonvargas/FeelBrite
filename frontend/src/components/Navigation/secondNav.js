import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import styles from'./Navigation2.module.css';

function SecondNavigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
      <div className={styles.dropdown}>
              <i className="icon far fa-user-circle fa-2x"></i>
            <div className={styles.dropdownContent}>
              <Link className={styles.links} to='/login'>Log in</Link>
              <Link className={styles.links} to='/signup'>Sign up</Link>
              </div>
      </div>
      </>
    );
  }

  return (
    <>
    <nav className={styles.navBar}>
      <div className={styles.homediv}>
      <Link exact to="/">
        <img alt='logo' src='https://i.imgur.com/HeZZnbz.png' className={styles.logo}></img>
        </Link> 

      {sessionUser ? <NavLink to='/add'className={styles.createBtn}>Create Event</NavLink> : ''}
       

        {/* <NavLink to='/add'><button className={styles.createBtn}>Create Event</button></NavLink> */}

        {isLoaded && sessionLinks}
        </div>
    </nav>
   
    </>
  );
}

export default SecondNavigation;