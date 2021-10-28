import SecondNavigation from '../Navigation/secondNav'
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router';
import { addEvent } from '../../store/events';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './AddListing.module.css'

function AddListing({showModal, setShowModal}) {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')
  const [categoryId, setCategory] = useState(1)
  const dispatch = useDispatch();
  const history = useHistory()
  const { id } = useParams() 
  const sessionUser = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([])

  
  const hostId = sessionUser?.id

  const handleSubmit = async (e) => {
      e.preventDefault()
      const data = []

      if (name === '') {
        data.push('Please include a name for your event')
      }
      if (image === '') {
        data.push('Please include an image url')
      }
      if (details === '') {
        data.push('Please write a description for your event')
      }
      if (location === ''){
        data.push('Please include location')
      }
      if (data === '') {
        data.push('Please specify a date')
      }
      setErrors(data)
       const payload = {
          hostId,
          name,
          image,
          details,
          date,
          location,
          categoryId
      };
      if (data.length === 0) {
      let createdEvent = await dispatch(addEvent({ hostId,
        name,
        image,
        details,
        date,
        location,
        categoryId}))
      if (createdEvent) {
        setShowModal(false)
        history.push(`/details/${createdEvent.id}`)
      }
    }
  }

  const updateFile = async (e) => {
    const file = e.target.files[0];
    // const file = imageInput.files[0]

  // get secure url from our server
  const { url } = await fetch("/s3Url").then(res => res.json())
  console.log(url)

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  const imageUrl = url.split('?')[0]
  setImage(imageUrl)

  };

    useEffect(() => {
     
      const data = []
      if (showModal === false) {
        setName('')
        setLocation('')
        setImage('')
        setDate('')
        setDetails('')
       
   }}, [showModal])
  
  
  
  return  (
      
  <div className={styles.container}>
    
     
      <div className={styles.container2}>
    <form  className={styles.inputForm}>
    <div className={styles.errors1}>
      {errors.map(err =>( <div>{err}</div>))}
      </div>
        <h2 className={styles.h2}>Create Event</h2>
      <div className={styles.container3}>
        <label>Upload your event's image</label>
      <input type='file' onChange={updateFile}></input>
      <input
      className={styles.input}
      type='hidden'
      value={hostId}
      />

      <input
      placeholder='Title'
      className={styles.input}
      type='text'
      value={name}
      onChange={(e) => setName(e.target.value)}/>

      <input 
      placeholder='Address'
      className={styles.input}
      type='text'
      value={location}
      onChange={(e) => setLocation(e.target.value)}/>

    <input
      placeholder='Date'
      className={styles.input}
      type='text'
      value={date}
      onChange={(e) => setDate(e.target.value)}/>

    <input 
      placeholder='Image Url'
      className={styles.input}
      type='text'
      value={image}
      onChange={(e) => setImage(e.target.value)}/>
   
     <textarea
      placeholder='description'
      className={styles.input}
      type='text'
      value={details}
      onChange={(e) => setDetails(e.target.value)}/>

    <label> 
        <select id={styles.select} className={`${styles.input} ${styles.select}`} onChange={(e) => setCategory(+e.target.value)} defaultValue={categoryId}>
          <option value='1'>Cycling</option>
          <option value='2'>Yoga</option>
          <option value='3'>Crossfit</option>
          <option value='4'>Outdoors</option>
          {/* <option value='5'>nice</option> */}
        </select>
      </label>
      
      <button  onClick={handleSubmit} className={styles.btn} type='submit'>Create Event</button>
      </div>
      </form>
      </div>
      </div>
   
  );
}

export default AddListing;