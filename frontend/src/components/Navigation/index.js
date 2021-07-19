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
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <div className={styles.dropdown}>
              <i className="far fa-user-circle fa-3x"></i>
            <div className={styles.dropdownContent}>
              <Link className={styles.links} to='/login'>Log in</Link>
              <Link className={styles.links} to='/signup'>Sign up</Link>
              </div>
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
   
   
    <div class={styles.searchBar}>
      <div class={styles.search}>
          <input type="text" class={styles.input} placeholder="Begin Your Search"></input>
          <button type="submit" class={styles.searchButton}>
            <i class="fa fa-search"></i>
        </button>  
        {isLoaded && sessionLinks}
      </div>
    </div>  
        
    </ul>
  );
}

export default Navigation;