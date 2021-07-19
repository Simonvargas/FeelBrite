import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import styles from'./LoginForm.module.css'

function LoginForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    history.push('/')
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };
  const demoLogin = () => {
    const credential = 'Demo-lition'
    const password = 'password'
    history.push('/')
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
      <div className={styles.container}>
        {/* <div className='form-container'> */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
              <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className={styles.loginText}>
            <h1 className={styles.loginH1}>Sign in</h1>
            <label>
              <input
              className={styles.input}
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder='Username or Email'
              />
            </label>
            <label>
              <input
              className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </label>
            <button className={styles.loginFormBtn} type="submit">Log In</button>
            </div>
          </form>
            <div className={styles.signContainer}>
              <div className={styles.signText}>
                <Link exact to="/">
                <img alt='logo' src='https://i.imgur.com/BTfD1Ny.png?1' className={styles.logo}></img>
               </Link>
              <h1>Welcome, Friend!</h1>
                <p>Start your journey with us!</p>
                <Link to='/signup'>
                <button class={styles.ghost} id="signUp">Sign Up</button>
                  </Link>
                  <div className={styles.demoContainer}>
                  <h1>Or try as a Demo User!</h1>
                  <button onClick={demoLogin} className={styles.demoBtn}>Demo User</button>
                  </div>
                  </div>
                  
                </div>
      </div>
  );
}

export default LoginForm;
