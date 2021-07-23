import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import styles from'./Navigation.module.css';

function Navigation({ isLoaded }){
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
      {sessionUser ?<NavLink to='/add'className={styles.createBtn}>Create Event</NavLink> : ''}
        <Link exact to="/">
        <img alt='logo' src='https://i.imgur.com/BTfD1Ny.png?1' className={styles.logo}></img>
        </Link> 

        {/* <NavLink to='/add'><button className={styles.createBtn}>Create Event</button></NavLink> */}

        {isLoaded && sessionLinks}
        </div>
    </nav>
    <nav>
      <div className={styles.secondNav}>
        
      </div>
    </nav>
    </>
  );
}

export default Navigation;