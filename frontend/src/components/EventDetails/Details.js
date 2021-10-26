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
  
    const [showModal, setShowModal] = useState(false)

    function show() {
        setShowModal(true)
    }
    
    function hide() {
        setShowModal(false)
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
          setRegister(newEvent?.Registrations?.find((fav) => +fav.userId === +userId))
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
            <SecondNavigation />
            <div className={styles.container}>
               <div className={styles.firstContent} > <h1>{event.name}</h1>
               {userId == event.hostId? <div>
                   <button  className={styles.btn2}>Delete Listing</button>
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
                </div>    
      
                    
                    </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Details;
