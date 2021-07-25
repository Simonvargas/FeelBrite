import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import SecondNavigation from '../Navigation/secondNav'
import { csrfFetch } from '../../store/csrf';
import ProfileWelcome from './ProfileWelcome'
import styles from './Profile.module.css'
import { useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
import { deleteEvent, deleteRegister, deleteBookmark } from '../../store/events';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router';


function Profile() {
  const [events, setEvents] = useState([]);
  const [registers, setRegister] = useState([])
  const [bookmarks, setBookmark] = useState([])
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const { id } = useParams()
 
  // const[showForm, setShowForm] = useState(false)
  // function click() {
  //   setShowForm(true)
  //   }
  

  useEffect(() => {
    (async function () {
      const res = await csrfFetch("/api/events");
      
      if (res.ok) {
        const newEvents = await res.json();
       await setEvents(newEvents);
      }
    })();
  }, []);
  const history = useHistory()
  
  useEffect(() => {
    (async function () {
      const res = await csrfFetch("/api/registration");
      if (res.ok) {
        const registration = await res.json();
       await setRegister(registration);
      
      }
    })();
  }, []);
  useEffect(() => {
    (async function () {
      const res = await csrfFetch("/api/bookmark");
      if (res.ok) {
        const bookmark = await res.json();
       await setBookmark(bookmark);
      // console.log(bookmark)
      }
    })();
  }, []);

  async function Delete(eventId) {
    await dispatch(deleteEvent(eventId))
    history.push('/')
  }

  async function RegisterGone(eventId) {
    await dispatch(deleteRegister(eventId))
    history.push('/')
  }
  async function deleteBookmark(eventId) {
    await dispatch(deleteBookmark(eventId))
    history.push('/')
  }

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
      <>
      <SecondNavigation isLoaded={isLoaded} />
      {isLoaded}
      <div className={styles.grid}>
      <div className={styles.container}>
        <div className={styles.eventsContainer}>
          <ProfileWelcome />
       </div>
       </div>
       <div className={`${styles.eventsContainer1}`}>
       <h2 className={styles.h2}>Your Created Events</h2>
       {events.map(event => {
         if (event.hostId === sessionUser?.id) { 
           return (
        <div className={styles.eventsContainer2}>
          <div className={styles.containerphoto}>
        <Link to={`/details/${event.id}`}>
          <b className={styles.eventName}>{event.name}</b>
          <img className={`${styles.fitImg}`}src={event.image} alt={event.name}></img>
          </Link>
          <button className={styles.deleteBtn} onClick={() => Delete(event.id)}> delete</button>
          </div>
          </div>
          )
          }
})}
       </div>
       <div className={`${styles.eventsContainer3} `}>
       <h2 className={styles.h2}>Registered Events</h2>
       {events.map(event => {
        for (let i = 0; i < registers.length; i++) {
          if (event.id === registers[i].eventId && sessionUser?.id === registers[i].userId) {
            return (
              <div className={styles.eventsContainer2}>
            <div className={styles.containerphoto}>
              <Link to={`/details/${event.id}`}>
                <b className={styles.eventName}>{event.name}</b>
                <img className={styles.fitImg}src={event.image} alt={event.name}></img>
                </Link>
                <button className={styles.deleteBtn} onClick={() => Delete(event.id)}> delete</button>
                </div>
                </div>
            )
          
        } 
}})}
</div>
 <div className={`${styles.eventsContainer4}`}>
       <h2 className={styles.h2}>Bookmarks</h2>
       {events.map(event => {
        for (let i = 0; i < bookmarks.length; i++) {
          if (event.id === bookmarks[i].eventId && sessionUser?.id === bookmarks[i].userId) {
            return (
          <div className={styles.eventsContainer2}>
            <div className={styles.containerphoto}>
              <Link to={`/details/${event.id}`}>
                <b className={styles.eventName}>{event.name}</b>
                <img className={styles.fitImg}src={event.image} alt={event.name}></img>
                </Link>
                <button className={styles.deleteBtn} onClick={() => Delete(event.id)}> delete</button>
                </div>
                </div>
            )
          
        } 
}})}
       </div>
       </div>
      </>
  );
}

export default Profile;