import React, {Component, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {ACTION_LOGIN, login} from '../../Redux/Action/AuthAction';

const LoginScreen = () => {
  const dispatch = useDispatch ();
  const onLogin = () => {
    dispatch (login ());
    <Navigate to="/home" replace={true} />;
  };

  return (
    <div style={{width: 1000, margin: '0 auto', textAlign: 'center'}}>
      <h1>Login Screen</h1>
      <div className="d-flex" style={{justifyContent: 'center'}}>
        <div style={{width: 100}}>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={onLogin}
          >
            <i className="fa fa-lock" /> Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;