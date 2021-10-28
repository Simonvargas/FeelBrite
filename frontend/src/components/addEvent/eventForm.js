import { useState } from 'react'
import { useDispatch } from "react-redux";
import styles from './eventForm.module.css'
import { useSelector } from 'react-redux';
import { editEvent } from '../../store/events';
import { useParams } from 'react-router-dom'

function EventForm({showModal, setShowModal, event}) {
    const [name, setName] = useState(event.name)
    const [image, setImage] = useState(event.image)
    const [date, setDate] = useState(event.date)
    const [location, setLocation] = useState(event.location)
    const [details, setDetails] = useState(event.details)

    const dispatch = useDispatch();
    const { id } = useParams()    
    const sessionUser = useSelector(state => state.session.user);

   

    const hostId = sessionUser.id
  
    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            id,
            hostId,
            name,
            details,
            image,
            date,
            location,
        };
        
        let createdEvent = dispatch(editEvent(payload))
        if (createdEvent) {
        setShowModal(false)
        }
    }
  return (
      <>
      <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
      <div className={styles.inputContainer}>
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
      type='hidden'
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
      <textarea
      placeholder='Event details'
      className={styles.input}
      type='text'
      value={details}
      onChange={(e) => setDetails(e.target.value)}/>
      </label>
      <button className={styles.btn}  type='submit'>Submit</button>
      <button className={styles.btn} onClick={()=> setShowModal(false)} type='submit'>Cancel</button>
      </div>
      </form>
      </div>
      </>
   
  );
}

export default EventForm;