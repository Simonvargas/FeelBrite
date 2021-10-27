import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'

const NotFound = () => {

    return (
    <div className={styles.body}>
        
        <h1 className={styles.h2}> 404 Page not found!</h1>
        <Link to='/'><img className={styles.newImg} src='https://i.imgur.com/QnAPvcN.png'></img></Link>
        <div className={styles.white}></div>
        </div>
    )
};

export default NotFound;

