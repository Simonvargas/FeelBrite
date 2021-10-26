import React, {useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import styles from'./Navigation2.module.css';

import Rodal from 'rodal';
import AddListing from '../addEvent/AddListing';
import 'rodal/lib/rodal.css';


function SecondNavigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [showModal, setShowModal] = useState(false)

  function show() {
    setShowModal(true)
  }
  
  function hide() {
    setShowModal(false)
  }
  

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

        {sessionUser ? <button  className={styles.createBtn} onClick={show}>Create Event</button>: ''}
       
      <Rodal closeOnEsc={true} clasName={styles.ro} showCloseButton={false} animation='flip' visible={showModal} onClose={hide}>
            <div className={styles.rodal}>
              <AddListing setShowModal={setShowModal} showModal={showModal}/>
            </div>
          </Rodal>
        {/* <NavLink to='/add'><button className={styles.createBtn}>Create Event</button></NavLink> */}

        {isLoaded && sessionLinks}
        </div>
    </nav>
   
    </>
  );
}

export default SecondNavigation;