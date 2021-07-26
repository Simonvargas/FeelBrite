import { useState, useEffect } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/index'
import { csrfFetch } from '../../store/csrf';
import Footer from '../Footer/Footer'
import EventsComponent from './Events'
import styles from'./HomePage.module.css'

function HomePage() {

  const dispatch = useDispatch();

  const [events, setEvents] = useState([])
  const [category, setCategory] = useState([])
  const[showForm, setShowForm] = useState(true)
  function click() {
    setShowForm(false)
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

const categoryType = category.map(e => e.type)
const categoryId = category.map(e => e.id)



  function toggle() {
    setShowForm(true)
  }

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
      <>
      
      <Navigation isLoaded={isLoaded} />
      {isLoaded}
      
     <div className={styles.contain2}>
     
        <div className={styles.cat}>
        <button className={styles.catBtn} onClick={toggle}>All events</button>
        <button className={styles.catBtn} onClick={click} value={categoryId[0]}>{categoryType[0]}</button>
        <button className={styles.catBtn} onClick={click} value={categoryId[1]}>{categoryType[1]}</button>
        <button className={styles.catBtn} onClick={click} value={categoryId[2]}>{categoryType[2]}</button>
        <button className={styles.catBtn} onClick={click} value={categoryId[3]}>{categoryType[3]}</button>
        </div>
        {/* <div className={styles.showFormDiv}> */}
      {showForm? <EventsComponent setShowForm={setShowForm}/> : ''}
      {/* <div className={styles.eventsContainer}>
        {events.map(event => 
        <div className={styles.containerphoto}>
        <Link to={`/details/${event.id}`}>
          <b className={styles.eventName}>{event.name}</b>
          <img className={styles.fitImg}src={event.image} alt={event.name}></img>
          </Link>
          </div>
          
        )}
        </div> */}
      </div>
      <div className={styles.footer}>
      <Footer />
      </div>
      </>
  );
}

export default HomePage;



// { if (cat.id === events[i].cat