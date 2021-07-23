import { Route, Switch } from 'react-router-dom'
import SignupFormPage from './components/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage'
import AddEvent from './components/addEvent/addEvent'
import Profile from './components/Profile/Profile'
import Details from './components/details/Details'


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

      <Route path='/profile'>
        <Profile />
      </Route>

      <Route path='/details/:id'>
        <Details />
      </Route>

    </Switch>
    </>
  );
}

export default App;
