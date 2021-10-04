import React, {useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import HomePage from '../HomePage/HomePage';
import LoginForm from './LoginForm';
import * as sessionActions from "../../store/session";


const Login = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    console.log('user', user)
    const [isLoaded, setIsLoaded] = useState(false);

   
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
      }, [dispatch]);
  return (
      <>
       {(user) ? <HomePage /> : <LoginForm/>}
       </>
  )
};

export default Login;
