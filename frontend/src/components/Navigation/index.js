import React, {useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import styles from'./Navigation.module.css';

import Rodal from 'rodal';
import AddListing from '../addEvent/AddListing';
import 'rodal/lib/rodal.css';


function Navigation({ isLoaded }){
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
              <i id={styles.icon} className="icon far fa-user-circle fa-2x"></i>
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
       {sessionUser ?  
      //  <NavLink to='/add'className={styles.createBtn}>Create Event</NavLink>
       <>
          <Rodal closeOnEsc={true} clasName={styles.ro} showCloseButton={false} animation='flip' visible={showModal} onClose={hide}>
            <div className={styles.rodal}>
              <AddListing  setShowModal={setShowModal} showModal={showModal}/>
            </div>
          </Rodal>


       <div className={styles.logoText}>
          <b>FeelBrite <i class="fas fa-bolt"></i></b>
          <h1>Time to choose your next battle!</h1>
          <p>You have unlimited access to in-person workout classes, live zoom classes, and on demand videos wherever you are.</p>
        </div>
        <div className={styles.workContainer}>
        <img className={styles.workPhoto} src='https://i.imgur.com/BTwpHgg.png' alt='workout'></img>
        </div> 
        </>
        :
        <>


        <div className={styles.logoText}>
          <b>FeelBrite</b>
          <h1>The place to start your fitness journey</h1>
          <p>Get unlimited access to in-person workout classes, live zoom classes, and on demand videos wherever you are</p>
        </div> 
        <div className={styles.workContainer2}>
        <img className={styles.workPhoto2} src='https://i.imgur.com/3psEktu.png' alt='workout'></img>
        </div> 
        </>
              }
              {/* <div className={styles.workContainer}>
              <img className={styles.workPhoto} src='https://i.imgur.com/BTwpHgg.png' alt='workout'></img>
              </div> */}
        {isLoaded && sessionLinks}
        </div>
    </nav>
   
    </>
  );
}

export default Navigation;