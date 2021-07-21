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
        console.log(payload)

        let createdEvent = dispatch(addEvent(payload))
        if (createdEvent) {
            // history.push('/')
        }

    }
  return isLoaded && (
      <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded}
      <div className={styles.photoContainer}>
      <img className={styles.photo} src='https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-national-sports-minimalist-silhouette-blue-sky-banner-image_176796.jpg' alt='photo'></img>
      </div>
      
      
      <form onSubmit={handleSubmit} className={styles.inputForm}>
      <div className={styles.inputContainer}>
    
      <label>Event Name 
      <input 
      type='text'
      value={name}
      onChange={(e) => setName(e.target.value)}/>
      </label>
      <label>Image
      <input 
      type='text'
      value={image}
      onChange={(e) => setImage(e.target.value)}/>
      </label>
      <label>Date
      <input
       type='text'
       value={date}
       onChange={(e) => setDate(e.target.value)}/>
      </label>
      <label>Location
      <input 
      type='text'
      value={location}
      onChange={(e) => setLocation(e.target.value)}/>
      </label>
      <label>Capacity
      <input
      type='number'
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}/>
      </label>
      <button type='submit'>create event!</button>
      </div>
      </form>
      </>
  );
}

export default AddEvent;