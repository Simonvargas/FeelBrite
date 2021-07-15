import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginFormModal/index'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import * as sessionActions from "./store/session";
import SignupFormPage from './components/SignupForm';
import Navigation from './components/Navigation';
// import { LoginFormModal } from './components/LoginFormModal/index'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

 

  return isLoaded && (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
    <Switch>
    
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
    )}
    </>
  );
}

export default App;
