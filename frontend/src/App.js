import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import * as sessionActions from "./store/session";
import SignupFormPage from './components/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage'
import AddEvent from './components/addEvent/addEvent'

function App() {
 
 
  return (
    <>
    <Switch>
      
      <Route path='/' exact>
        <HomePage />
      </Route>
      
      <Route path='/login'>
        <LoginForm />
      </Route>
      
      <Route path='/signup'>
        <SignupFormPage />
      </Route>
      
      <Route path='/add'>
        <AddEvent/>
      </Route>

    </Switch>
    </>
  );
}

export default App;
