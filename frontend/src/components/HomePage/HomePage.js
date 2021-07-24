import { useState, useEffect } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/index'
import { csrfFetch } from '../../store/csrf';
import Footer from '../Footer/Footer'

import styles from'./HomePage.module.css'
function HomePage() {

  const dispatch = useDispatch();

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
     <div className={styles.contain2}>
      <div className={styles.eventsContainer}>
        {events.map(event => 
        <div className={styles.containerphoto}>
        <Link to={`/details/${event.id}`}>
          <b className={styles.eventName}>{event.name}</b>
          <img className={styles.fitImg}src={event.image} alt={event.name}></img>
          </Link>
          <div className={styles.secondNav}>
        
        </div>
          </div>
          
        )}
        </div>
        <Footer />
      </div>
      <div className={styles.footer}>
      <Footer />
      </div>
      </>
  );
}

export default HomePage;