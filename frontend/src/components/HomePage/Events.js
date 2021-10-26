import { useState, useEffect } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/index'
import { csrfFetch } from '../../store/csrf';
import Footer from '../Footer/Footer'

import styles from'./HomePage.module.css'
function EventsComponent() {

  const dispatch = useDispatch();

  const [events, setEvents] = useState([])
  const [category, setCategory] = useState([])
  const[showForm, setShowForm] = useState(false)

  useEffect(() => {
    (async function(){
      const res = await csrfFetch('/api/events')

      if (res.ok) {
        const newEvents = await res.json()
        setEvents(newEvents)
      }
    })()
  }, [])

  
  useEffect(() => {
    (async function(){
      const res = await csrfFetch('/api/categories')

      if (res.ok) {
        const categories = await res.json()
        setCategory(categories)
      }
    })()
  }, [])


  return  (
      <>
<div className={styles.eventsContainer}>
        {events.map(event => {
          
                    return (
        <div className={styles.containerphoto}>
        <Link to={`/details/${event.id}`} style={{ textDecoration: 'none' }}>
          <div>
          <b className={styles.eventName}>{event.name}</b>
          <img className={styles.fitImg} src={event.image} alt={event.name}></img>
          
          </div>
          </Link>
          
          </div>
                    )
})}
        </div>
     </>
  );
}

export default EventsComponent;

