import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import * as sessionActions from "./store/session";
import SignupFormPage from './components/SignupForm';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage'

function App() {
 
 
  return (
    <>
    <Switch>
      <route path='/' exact>
        <HomePage />
      </route>
      <route path='/login'>
        <LoginForm />
      </route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
