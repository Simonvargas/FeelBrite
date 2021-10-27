import React from 'react';

import styles from './NotFound.module.css'

const NotFound = () => {

    return (
    <div className={styles.body}>
        <h1 className={styles.h2}>404 Page not found!</h1>
        <img className={styles.newImg} src='https://i.imgur.com/QnAPvcN.png'></img>
        <div className={styles.white}></div>
        </div>
    )
};

export default NotFound;

