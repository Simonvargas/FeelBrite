import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/index'
import { csrfFetch } from '../../store/csrf';
import ProfileWelcome from './ProfileWelcome'
import styles from './Profile.module.css'
import { useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
import { deleteEvent, Register, deleteRegister } from '../../store/events';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router';


function Profile() {
  const [events, setEvents] = useState([]);
  const [registers, setRegister] = useState([])
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
 
  const[showForm, setShowForm] = useState(false)
  function click() {
    setShowForm(true)
    }
  

  const { id } = useParams()
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

  async function Delete(eventId) {
    await dispatch(deleteEvent(eventId))
    history.push('/')
  }

  async function RegisterGone(eventId) {
    await dispatch(deleteRegister(eventId))
    history.push('/')
  }

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
       <h2 className={styles.h2}>Your Created Events</h2>
       <div className={styles.eventsContainer2}>
       {events.map(event => 
        <div>{event.hostId === sessionUser?.id ? <div className={styles.containerphoto}>
        <Link to={`/details/${event.id}`}>
          <b className={styles.eventName}>{event.name}</b>
          <img className={styles.fitImg}src={event.image} alt={event.name}></img>
          </Link>
          <button onClick={() => Delete(event.id)}> delete</button>
        
          </div>: ''}
          </div>
       )}
       </div>
       <div className={styles.border}>
       <h2 className={styles.h2}>Registered Events</h2>
       </div>
       <div className={styles.eventsContainer2}>
       {events.map(event => {
        for (let i = 0; i < registers.length; i++) {
          if (event.id === registers[i].eventId && sessionUser?.id === registers[i].userId) {
            return (
            <div className={styles.containerphoto}>
              <Link to={`/details/${event.id}`}>
                <b className={styles.eventName}>{event.name}</b>
                <img className={styles.fitImg}src={event.image} alt={event.name}></img>
                </Link>
                <button className={styles.deleteBtn} onClick={() => Delete(event.id)}> delete</button>
                </div>
            )
          
        } 
}})}
       </div>
      </>
  );
}

export default Profile;