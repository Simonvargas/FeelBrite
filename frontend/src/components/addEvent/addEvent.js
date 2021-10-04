import SecondNavigation from '../Navigation/secondNav'
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router';
import { addEvent } from '../../store/events';
import styles from './addEvent.module.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function AddEvent() {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [details, setDetails] = useState('')
    const [categoryId, setCategory] = useState(1)

    const dispatch = useDispatch();
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams() 
    const sessionUser = useSelector(state => state.session.user);

    // function number1() {
    //   set
    // }
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const hostId = sessionUser?.id
  
    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            hostId,
            name,
            image,
            details,
            date,
            location,
            categoryId
        };
        console.log(payload)
        let createdEvent = await dispatch(addEvent(payload))
        if (createdEvent) {
          history.push(`/details/${createdEvent.id}`)
        }
    }
  return isLoaded && (
      <>
      <SecondNavigation isLoaded={isLoaded} />
      {isLoaded}
  <div className={styles.container}>
    <form onSubmit={handleSubmit} className={styles.inputForm}>
      <div className={styles.inputContainer}>
        <h2 className={styles.h2}>Create an Event!</h2>
        <label>
      <input
      placeholder={sessionUser.username}
      className={styles.input}
      type='hidden'
      value={hostId}
      />
      </label>
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
      placeholder='MM/DD/YYYY'
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
      <textarea
      placeholder='details'
      className={styles.input}
      type='text'
      value={details}
      onChange={(e) => setDetails(e.target.value)}/>
      </label>
      <label> 
        <select className={`${styles.input} ${styles.select}`} onChange={(e) => setCategory(+e.target.value)} defaultValue={categoryId}>
          <option value='1'>Cycling</option>
          <option value='2'>Yoga</option>
          <option value='3'>Crossfit</option>
          <option value='4'>Outdoors</option>
          {/* <option value='5'>nice</option> */}
        </select>
      </label>
      <button className={styles.btn} type='submit'>create event!</button>
      </div>
      </form>
      </div>
      </>
   
  );
}

export default AddEvent;