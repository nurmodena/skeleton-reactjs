import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigation from './Navigation/Auth/AuthNavigation';
import ScreenNavigation from './Navigation/Screen/ScreenNavigation';

const App = () => {
  const isLoggedIn = useSelector(({ auth: { isLoggedIn } }) => isLoggedIn);
  return isLoggedIn ? <ScreenNavigation /> : <AuthNavigation />;
};

export default App;
