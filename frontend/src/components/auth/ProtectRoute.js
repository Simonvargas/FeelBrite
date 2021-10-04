import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  
  return (
    <Route {...props}>
      {(user)? <Redirect to='/' exact={true}/> : <LoginForm />}
    </Route>
  )
};


export default ProtectedRoute;
