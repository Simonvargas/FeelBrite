import { useState, useEffect } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/index'
// import { Events } from '../../../../backend/db/models/event'
import { csrfFetch } from '../../store/csrf';

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
      <div className={styles.photoContainer}>
      <img className={styles.photo} src='https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-national-sports-minimalist-silhouette-blue-sky-banner-image_176796.jpg' alt='photo'></img>
      </div>
      <div className={styles.eventsContainer}>
        {events.map(event => 
        <Link to={`/details/${event.id}`}>
          <b className={styles.eventName}>{event.name}</b>
          <img className={styles.fitImg}src={event.image} alt={event.name}></img>
          </Link>
          
        )}
      </div>
      </>
  );
}

export default HomePage;