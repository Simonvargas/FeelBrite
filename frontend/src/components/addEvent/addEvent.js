import Navigation from '../Navigation/index'
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router';
import { addEvent } from '../../store/events';
import styles from './addEvent.module.css'

function AddEvent() {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [capacity, setCapacity] = useState(1)


    const dispatch = useDispatch();
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


  
    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            image,
            date,
            location,
            capacity,
        };

        let createdEvent = dispatch(addEvent(payload))
        if (createdEvent) {
            history.push('/')
        }

    }
  return isLoaded && (
      <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded}

      <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
      <div className={styles.inputContainer}>
        <h2 className={styles.h2}>Create an Event!</h2>
      <label>
      <input
      placeholder='Event Name'
      className={styles.input}
      type='text'
      value={name}
      onChange={(e) => setName(e.target.value)}/>
      </label>
      <label>
      <input 
      placeholder='Image Url'
      className={styles.input}
      type='text'
      value={image}
      onChange={(e) => setImage(e.target.value)}/>
      </label>
      <label>
      <input
      placeholder='Date'
      className={styles.input}
       type='text'
       value={date}
       onChange={(e) => setDate(e.target.value)}/>
      </label>
      <label>
      <input 
      placeholder='Location'
      className={styles.input}
      type='text'
      value={location}
      onChange={(e) => setLocation(e.target.value)}/>
      </label>
      <label>
          {/* <p>Capacity</p> */}
      <input
      className={styles.input}
      type='number'
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}/>
      </label>
      <button className={styles.btn} type='submit'>create event!</button>
      </div>
      </form>
      </div>
      </>
   
  );
}

export default AddEvent;