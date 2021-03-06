import { useState, useEffect } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import SecondNavigation from '../Navigation/secondNav'
import { csrfFetch } from '../../store/csrf';
import { useParams } from 'react-router';
import styles from './Details.module.css'
import { deleteEvent, Register, Register2 } from '../../store/events';
import EventForm from '../addEvent/eventForm';
import { useHistory } from 'react-router-dom'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const Details = () => {
 
    const dispatch = useDispatch();
    const { id } = useParams()
    const [event, setEvent] = useState([])
    const[showForm, setShowForm] = useState(false)
    const history = useHistory()
    const [bookmark, setBookmark] = useState({});
    const [register, setRegister] = useState({})
    
    const sessionUserId = useSelector(state => state.session.user);
    const userId = sessionUserId?.id

    const [errors, setErrors] = useState([])
  
    const [showModal, setShowModal] = useState(false)

    function show() {
        setShowModal(true)
    }
    
    function hide() {
        setShowModal(false)
    }
    
    async function Delete() {
      await dispatch(deleteEvent(id))
      history.push('/')
    }
  
  
    useEffect(() => {
      (async function(){
        const res = await csrfFetch(`/api/events/${id}`)
  
        if (res.ok) {
          const oneEvent = await res.json()
          setEvent(oneEvent)
        }
      })()
    }, [id, showModal])
  
   
   
     async function Registers() {
      const eventId = parseInt(id)
      const data = []
      const payload = {
        userId,
        eventId
      }
      if (userId !== eventId) {
          data.push('You cannot register to your own event')
      }
      setErrors(data)

      if (data.length === 0) {
      await dispatch(Register(payload))
      history.push('/profile')
      }
    }
  
    const addToRegister = async () => {
      const data = []
      if (userId === event.hostId) {
        data.push('You cannot register to your own event')
    }
    setErrors(data)
    if (data.length === 0) {
      const response = await csrfFetch("/api/registration", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          eventId: id,
        }),
      });
      const data = await response.json();
      setRegister(data);
      window.alert('Your booking has been confirmed')
    }
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
          setRegister(newEvent?.Registrations?.find((fav) => +fav.userId === +userId))
        }
      })();
    }, []);
  
    const addToBookmark = async () => {
      const data = []
      if (userId === event.hostId) {
        data.push('You cannot bookmark to your own event')
    }
    setErrors(data)
    if (data.length === 0) {
      const response = await csrfFetch("/api/bookmark", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          eventId: id,
        }),
      });
      const data = await response.json();
      setBookmark(data);
    }
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
               <div className={styles.firstContent} > <h1>{event.name}</h1>
               {userId == event.hostId? <div>
                   <button  onClick={Delete} className={styles.btn2}>Delete Event</button>
                   <button onClick={show} className={styles.btn2}>Update</button>
               </div> : ''}

               <Rodal closeOnEsc={true}  showCloseButton={false} animation='flip' visible={showModal} onClose={hide}>
            <div className={styles.rodal}>
              {show ?<EventForm showModal={showModal} setShowModal={setShowModal} event={event}/> : ''}
            </div>
          </Rodal>


               </div>
                <br></br>
                <img className={styles.photo} src={event.image}></img>
                <div className={styles.bottomContainer}>
                    <div className={styles.left}>
                    <p style={{ color: 'gray' }}>{event.location} | Date: {event.date}</p>

                    <div className={styles.desc}>{event.details}</div>
                    </div>

                    <div className={styles.right}>
                    <div className={styles.rightContainer}>
                    
                    <div>
                    {register && register.eventId ? (
            <button className={styles.btn1} onClick={() => unRegister()}>Unregister</button>
          ) : (
            <button className={styles.btn1} onClick={() => addToRegister()}>Register</button>
          )}
          {bookmark && bookmark.eventId ? (
            <button className={styles.btn1} onClick={() => unbookmark()}>Unbookmark</button>
          ) : (
            <button className={styles.btn1} onClick={() => addToBookmark()}>Bookmark</button>
          )}
          <div className={styles.errors1}>
      {errors.map(err =>( <ul><li>{err}</li></ul>))}
      </div>
                </div>    
      
                    
                    </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Details;
