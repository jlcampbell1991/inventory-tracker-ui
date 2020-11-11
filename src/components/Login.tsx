import React from 'react';
import $ from 'jquery';
import { ButtonEvent, Element, InputEvent } from '../models/Types'

export function Login(props: {
  loginSubmit: (u: string, p: string, e: InputEvent) => void,
  signupClick: (e: ButtonEvent) => void
 }): Element {
  function getUsername(): string {
    return $("#username").val() as string;
  }

  function getPassword(): string {
    return $("#password").val() as string;
  }

  return(
    <div id="loginContainer" className="page-header header container-fluid">
      <div id="loginForm">
        <form>
          <div className='form-group'>
            <label htmlFor="username">Username</label><br/>
            <input type="text" id="username"/>
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password</label><br/>
            <input type="password" id="password"/>
          </div>
          <div>
            <input className='btn btn-primary' type="submit" value="Login" onClick={
            (e: InputEvent) => props.loginSubmit(getUsername(), getPassword(), e) }/>
            <button className='btn' onClick={ (e: ButtonEvent) => props.signupClick(e) }>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}
