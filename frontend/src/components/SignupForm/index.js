import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Link } from 'react-router-dom'

import styles from './SignupForm.module.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
<div className={styles.container}>
    <div className={styles.signContainer}>
        <div className={styles.signText}>
        <h1>Hello, Friend</h1>
            <p>Have an Account?</p>
            <Link to='/login'>
            <button class={styles.ghost} id="signUp">Log in</button>
            </Link>
            </div>
            </div>

    <form onSubmit={handleSubmit} className={styles.signupForm}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className={styles.login}>
        <h1 classname={styles.h1Text}>Begin your Journey</h1>
      <label>
        <input
        className={styles.input}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email'
        />
      </label>
      <label>
        <input
        className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder='Username'
        />
      </label>
      <label>
        <input className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
        />
      </label>
      <label>
        <input
            className={styles.input}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder='Confirm Password'
        />
      </label>
      <button type="submit" className={styles.signupBtn}>Sign Up</button>
      </div>
    </form>
    </div>
  );
}

export default SignupFormPage;


//     <h1 className='login-h1'>Sign in</h1>
//     <label>
//       <input
//         type="text"
//         value={credential}
//         onChange={(e) => setCredential(e.target.value)}
//         required
//         placeholder='Email'
//       />
//     </label>
//     <label>
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         placeholder='Password'
//       />
//     </label>
//     <button className='loginForm-btn' type="submit">Log In</button>
//     </div>
//   </form>
//     <div className='sign-container'>
//       <div className='sign-text'>
//       <h1>Welcome, Friend!</h1>
//         <p>Start your journey with us!</p>
//         <Link to='/signup'>
//         <button class="ghost" id="signUp">Sign Up</button>
//           </Link>
//           </div>
//         </div>
// </div>