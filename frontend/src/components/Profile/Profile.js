import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import SecondNavigation from '../Navigation/secondNav'
import { csrfFetch } from '../../store/csrf';
import styles from './Profile.module.css'
import { useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
import { deleteEvent} from '../../store/events';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router';


function Profile() {
  const [events, setEvents] = useState([]);
  const [registers, setRegister] = useState([])
  const [bookmarks, setBookmark] = useState([])
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const { id } = useParams()
  const [change, setChange] = useState(true)
  const userId = useSelector(state => state.session.user?.id);
  const [render, setRender] = useState(false)
  const history = useHistory()
  
  

  useEffect(() => {
    (async function () {
      const res = await csrfFetch("/api/events");
      
      if (res.ok) {
        const newEvents = await res.json();
       await setEvents(newEvents);
      }
    })();
  }, []);
  
  useEffect(() => {
    (async function () {
      const res = await csrfFetch("/api/registration");
      if (res.ok) {
        const registration = await res.json();
       await setRegister(registration);
      
      }
    })();
  }, [render]);
  useEffect(() => {
    (async function () {
      const res = await csrfFetch("/api/bookmark");
      if (res.ok) {
        const bookmark = await res.json();
       await setBookmark(bookmark);
      }
    })();
  }, []);

  useEffect(() => {
    setChange(true)
  })
  async function Delete(eventId) {
    await dispatch(deleteEvent(eventId))
    history.push('/')
  }

  const unRegister= async (e) => {
    const response = await csrfFetch("/api/registration", {
      method: "DELETE",
      body: JSON.stringify({
        userId: userId,
        eventId: e.target.id,
      }),
    });
    setRender(!render)
  };
  function deleteBookmark(e) {
    // const payload = {eventId,sessionUserId }
    // await dispatch(unbookmark(eventId))
    // history.push('/')
}


  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
      <>
      <SecondNavigation isLoaded={isLoaded} />
      {isLoaded}
      <div className={styles.grid}>
       <div className={styles.h2}>Your Created Events</div>
       <div className={`${styles.eventsContainer1}`}>
       {events.map(event => {
         if (event.hostId === sessionUser?.id) { 
           return (
            <Link style={{textDecoration: 'none'}} to={`/details/${event.id}`}>
            <div className={styles.eventsContainer2}>
          <div className={styles.containerphoto}>
         
        <b className={styles.eventName1}><img  className={styles.img1} src={event.image}></img> {event.name} | {event.location} | {event.date} </b> 
        {/* <button className={styles.deleteBtn} onClick={() => Delete(event.id)}> delete</button> */}
        </div>
              </div>
              </Link>

          )
          }
})}
       </div>
       <div className={styles.h2}>Registered Events</div>
       <div className={`${styles.eventsContainer1} `}>
       {events.map(event => {
        for (let i = 0; i < registers.length; i++) {
          if (event.id === registers[i].eventId && sessionUser?.id === registers[i].userId) {
            return (
              <div className={styles.eventsContainer2}>
              <Link style={{textDecoration: 'none'}} to={`/details/${event.id}`}>
            <div className={styles.containerphoto}>
           
          <b className={styles.eventName1}><img  className={styles.img1} src={event.image}></img> {event.name} | {event.location} | {event.date} </b> 
          </div>
          </Link>
          {/* <button id={registers[i].id} className={styles.deleteBtn} onClick={unRegister}> delete</button> */}

                </div>
            )
          
        } 
}})}
</div>
<div className={styles.h2}>Bookmarks</div>

 <div className={`${styles.eventsContainer1}`}>
       {events.map(event => {
        for (let i = 0; i < bookmarks.length; i++) {
          if (event.id === bookmarks[i].eventId && sessionUser?.id === bookmarks[i].userId) {
            return (
              <Link style={{textDecoration: 'none'}} to={`/details/${event.id}`}>
          <div className={styles.eventsContainer2}>
            <div className={styles.containerphoto}>
          <b className={styles.eventName1}><img  className={styles.img1} src={event.image}></img> {event.name} | {event.location} | {event.date} </b> 
          {/* <button className={styles.deleteBtn} onClick={() => Delete(event.id)}> delete</button> */}
          </div>
                </div>
                </Link>
            )
          
        } 
}})}
       </div>
       </div>
      </>
  );
}

export default Profile;