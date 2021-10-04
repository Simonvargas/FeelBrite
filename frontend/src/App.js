import { Route, Switch } from 'react-router-dom'
import SignupFormPage from './components/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage'
import AddEvent from './components/addEvent/addEvent'
import Profile from './components/Profile/Profile'
// import Details from './components/details/Details'
// import Details from './components/details/Details';
import EventDetails from './components/EventDetails/EventDetails';
import ProtectedRoute from './components/auth/ProtectRoute';
import { useSelector } from 'react-redux';
import Login from './components/LoginForm/Login';
function App() {
  const user = useSelector(state => state.session.user)

 
  return (
    <>
    <Switch>
      
      <Route path='/' exact>
        <HomePage />
      </Route>
      
      <Route path='/login' >
         <Login />
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
        <EventDetails />
      </Route>

    </Switch>
    </>
  );
}

export default App;
