import { useState, useEffect } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import Navigation from '../Navigation/index'
import { csrfFetch } from '../../store/csrf';
import { useParams } from 'react-router';
import styles from './details.module.css'
import { deleteEvent, Register } from '../../store/events';
import EventForm from '../addEvent/eventForm';
import { useHistory } from 'react-router-dom'


function Details(){

  const dispatch = useDispatch();
  const { id } = useParams()
  const [event, setEvents] = useState([])
  const[showForm, setShowForm] = useState(false)
  const history = useHistory()
  
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser?.id

  useEffect(() => {
    (async function(){
      const res = await csrfFetch(`/api/events/${id}`)

      if (res.ok) {
        const oneEvent = await res.json()
        setEvents(oneEvent)
      }
    })()
  }, [id, showForm])

 
  async function Delete() {
    await dispatch(deleteEvent(id))
    history.push('/')
  }
 
   async function Registers() {
    const eventId = parseInt(id)
    const payload = {
      userId,
      eventId

    }
    console.log(payload)
    await dispatch(Register(payload))
    history.push('/profile')
  }

  function click() {
  setShowForm(true)
  }

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
      <div className={styles.details}>{event.details}</div>
      <div className={styles.btnContainer}>
      <button className={styles.btn} onClick={Registers} type='submit'>Register</button>
      {event.hostId === userId ? <button className={styles.btn} onClick={click} type='submit'>Edit Event</button> : ''}
      </div>
      </div>
      </div>
      <div className={styles.showFormDiv}>
      {showForm? <EventForm setShowForm={setShowForm}/> : ''}
      </div>
  </div>
  )
  }
  export default Details;