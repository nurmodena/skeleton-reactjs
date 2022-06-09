import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import AuthNavigation from './Navigation/Auth/AuthNavigation';
import ScreenNavigation from './Navigation/Screen/ScreenNavigation';
import { ACTION_LOGIN } from './Redux/Action/AuthAction';

const App = () =>{ 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log('isLoggedIn', isLoggedIn);
  return (

    isLoggedIn ? (<ScreenNavigation />) : (<AuthNavigation />)
  );
}

export default App;
