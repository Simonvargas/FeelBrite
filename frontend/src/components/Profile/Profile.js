import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/index'
import { csrfFetch } from '../../store/csrf';
import ProfileWelcome from './ProfileWelcome'
import styles from './Profile.module.css'
import { useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
function Profile() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [events, setEvents] = useState([])

  useEffect(() => {
    (async function(){
      const res = await csrfFetch('/api/events')

      if (res.ok) {
        const newEvents = await res.json()
        setEvents(newEvents)
      }
    })()
  }, [])

  
  // console.log('events!!', events)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
      <>
      
      <Navigation isLoaded={isLoaded} />
      {isLoaded}
      <div>
      </div>
      <div className={styles.container}>
        <div className={styles.eventsContainer}>
          <ProfileWelcome />
       </div>
       </div>
       {events.filter(event => {
        <p>{event.hostId === sessionUser.id? event.name : ''}</p>
       })}
      </>
  );
}

export default Profile;