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
  const [category, setCategory] = useState([])
  const[showForm, setShowForm] = useState(false)
  function click() {
    setShowForm(true)
    }
  
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

const categoryId = category.map(e => e.id)
console.log(categoryId)

function catClick() {
  events.map(event =>  (
    <div className={styles.containerphoto}>
    <Link to={`/details/${event.id}`}>
      <b className={styles.eventName}>{event.name}</b>
      <img className={styles.fitImg}src={event.image} alt={event.name}></img>
      </Link>
      </div>
  )
  )}
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
      <>
<div className={styles.eventsContainer}>
        {events.map(event => {
            for (let i = 0 ; i < category.length; i++) {
                if (event.categoryId === category[i].id) {
                    return (
        <div className={styles.containerphoto}>
        <Link to={`/details/${event.id}`}>
          <b className={styles.eventName}>{event.name}</b>
          <img className={styles.fitImg}src={event.image} alt={event.name}></img>
          </Link>
          </div>
                    )
}}})}
        </div>
     </>
  );
}

export default HomePage;

