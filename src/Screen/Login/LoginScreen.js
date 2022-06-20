import React, { Component, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ACTION_LOGIN, login } from '../../Redux/Action/AuthAction';
import bg from './image-login-screen.jpg'

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [pswState, setPswState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {username: '', password: ''}});
  

  const onPasswordStateChange = () => {
    setPswState(!pswState);
  }

  const onSubmit = data => {
    dispatch(login(data, ({response}) => {
      if (response.data && response.data.message){
        setErrorMessage(response.data.message)
      }
      
    }));

    <Navigate to="/home" replace={true} />;
  }

  return (
    <div className='login-container' style={{ height: '100vh' }}>
      <div className='bg-login' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
      <div className='login-form' style={{  }}>
        <div className='d-flex' style={{ height: '100%', flexDirection: 'column', justifyContent: "center" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row' style={{ width: '100%' }}>
            <div className='col-1'></div>
            <div className='col-10'>
              <div className='form-group mb-3'>
                <h1 style={{ color: '#777' }}>Login</h1>
                <h4 style={{ color: '#777', fontSize: 18, fontWeight: 400, marginBottom: 20 }}>Tecnical Service Manual</h4>
              </div>
              <div className='form-group'>
                <label>Email or Username</label>
                <div style={{border: 'solid 1px #ccc', borderRadius: 4}}>
                  <input {...register('username', {required: {value: true, message: 'Email is required'}})} className='inputLogin'/> 
                </div>
                {errors.username && <span className='text-danger'>{errors.username.message}</span>}
              </div>
              <div className='form-group'>
                <label>Password</label>
                <div style={{border: 'solid 1px #ccc', borderRadius: 4, display: 'flex'}}>
                  <input className='inputLogin' type={ pswState ? "text": "password" } {...register('password', {required: {value: true, message: 'Password is required'}})}/>
                  <a onClick={onPasswordStateChange} className='btn btn-outline'><i className={pswState ? 'fa fa-eye' : 'fa fa-eye-slash'} /></a>
                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
              </div>
              <div className='form-group'>
                {errorMessage && <span className='text-danger'>{errorMessage}</span>}
              </div>
              <div className='form-group'>
                <div style={{marginTop: 40}}>
                  <button type='submit' className='btn btn-block btn-dark btn-lg'><i className='fa fa-lock' /> Login</button>
                </div>
              </div>
            </div>
            <div className='col-1'></div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
