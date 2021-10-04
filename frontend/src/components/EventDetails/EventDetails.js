import { useState, useEffect } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import SecondNavigation from '../Navigation/secondNav'
import { csrfFetch } from '../../store/csrf';
import { useParams } from 'react-router';
import styles from './eventDetails.module.css'
import { deleteEvent, Register, Register2 } from '../../store/events';
import EventForm from '../addEvent/eventForm';
import { useHistory } from 'react-router-dom'


function EventDetails(){

  const dispatch = useDispatch();
  const { id } = useParams()
  const [event, setEvent] = useState([])
  const[showForm, setShowForm] = useState(false)
  const history = useHistory()
  const [bookmark, setBookmark] = useState({});
  const [register, setRegister] = useState({})
  
  const sessionUserId = useSelector(state => state.session.user);
  const userId = sessionUserId?.id

  useEffect(()=>{
    localStorage.getItem('bookmark')
  },[]);
  
  useEffect(()=>{
    localStorage.setItem('bookmark', bookmark)
},[bookmark]);




  useEffect(() => {
    (async function(){
      const res = await csrfFetch(`/api/events/${id}`)

      if (res.ok) {
        const oneEvent = await res.json()
        setEvent(oneEvent)
      }
    })()
  }, [id, showForm])

 
 
   async function Registers() {
    const eventId = parseInt(id)
    const payload = {
      userId,
      eventId
    }
    await dispatch(Register(payload))
    history.push('/profile')
  }

  const addToRegister = async () => {
    const response = await csrfFetch("/api/registration", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        eventId: id,
      }),
    });
    const data = await response.json();
    setRegister(data);
  };

  const unRegister= async () => {
    const response = await csrfFetch("/api/registration", {
      method: "DELETE",
      body: JSON.stringify({
        userId: userId,
        eventId: id,
      }),
    });
    setRegister(null);
  };
 

  function click() {
  setShowForm(true)
  }

  useEffect(() => {
    (async function () {
      const res = await csrfFetch(`/api/events/${id}`);
      if (res.ok) {
        const newEvent = await res.json();
        setEvent(newEvent);
        setBookmark(newEvent?.Bookmarks?.find((fav) => +fav.userId === +userId));
        console.log(bookmark)
        setRegister(newEvent?.Registrations?.find((fav) => +fav.userId === +userId))
        console.log(register)
      }
    })();
  }, []);

  const addToBookmark = async () => {
    const response = await csrfFetch("/api/bookmark", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        eventId: id,
      }),
    });
    const data = await response.json();
    setBookmark(data);
    console.log(data);
  };

  const unbookmark = async () => {
    const response = await csrfFetch("/api/bookmark", {
      method: "DELETE",
      body: JSON.stringify({
        userId: userId,
        eventId: id,
      }),
    });
    setBookmark(null);
  };

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div>
      <SecondNavigation isLoaded={isLoaded} />
      {isLoaded}
     
      <div className={styles.container}>
        <div className={styles.container2}>
      <h2 className={styles.h2}>{event.name}</h2>
      <img className={styles.photo} src={event.image} alt='nice'></img>
      <div className={styles.details}>{event.details}</div>
      <div className={styles.btnContainer}>
      {/* <button className={styles.btn} onClick={Registers} type='submit'>Register</button> */}
      {register && register.eventId ? (
            <button className={styles.btn} onClick={() => unRegister()}>Unregister</button>
          ) : (
            <button className={styles.btn} onClick={() => addToRegister()}>Register</button>
          )}
          {bookmark && bookmark.eventId ? (
            <button className={styles.btn} onClick={() => unbookmark()}>Unbookmark</button>
          ) : (
            <button className={styles.btn} onClick={() => addToBookmark()}>Bookmark</button>
          )}
      {event.hostId === userId ? <button className={styles.btn} onClick={click} type='submit'>Edit Event</button> : ''}
      </div>
      </div>
      </div>
      <div className={styles.showFormDiv}>
      {showForm? <EventForm setShowForm={setShowForm} event={event}/> : ''}
      
      </div>
     
  </div>
  )
  }
  export default EventDetails;