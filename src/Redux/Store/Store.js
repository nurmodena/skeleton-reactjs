import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import AuthReducer from '../Reducer/AuthReducer';
import InstallationReducer from '../Reducer/InstallationReducer';
import TroubleshotReducer from '../Reducer/TroubleShootReducer';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    installation: InstallationReducer,
    troubleshoot: TroubleshotReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(thunk)
  ]
});

export default store;