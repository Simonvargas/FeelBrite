import { useState, useEffect } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import Navigation from '../Navigation/index'
import { csrfFetch } from '../../store/csrf';
import { useParams } from 'react-router';

import styles from './details.module.css'

function Details() {

  const dispatch = useDispatch();
  const { id } = useParams()
  const [event, setEvents] = useState([])

  useEffect(() => {
    (async function(){
      const res = await csrfFetch(`/api/events/${id}`)

      if (res.ok) {
        const oneEvent = await res.json()
        setEvents(oneEvent)
      }
    })()
  }, [id])

  // console.log('events!!', events)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded}
      
      <div className={styles.container}>
        <div className={styles.container2}>
      <h2 className={styles.h2}>{event.name}</h2>
      <img className={styles.photo} src={event.image} alt='nice'></img>
      <button className={styles.btn} type='submit'>Register</button>
      <button className={styles.btn} type='submit'>Bookmark</button>
      </div>
      </div>
  </div>
  )
}

export default Details;