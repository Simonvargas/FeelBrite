import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

import styles from'./LoginForm.module.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

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
                placeholder='Email'
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
              <h1>Welcome, Friend!</h1>
                <p>Start your journey with us!</p>
                <Link to='/signup'>
                <button class={styles.ghost} id="signUp">Sign Up</button>
                  </Link>
                  </div>
                </div>
      </div>
  );
}

export default LoginForm;
