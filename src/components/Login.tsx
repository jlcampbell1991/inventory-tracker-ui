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
    <div>
      <form className="centered">
        <div>Username: <input type="text" id="username"></input></div>
        <div>Password: <input type="password" id="password"></input></div>
        <div><input type="submit" value="Login" onClick={
          (e: InputEvent) => props.loginSubmit(getUsername(), getPassword(), e)
        }></input></div>
      </form>
      <button onClick={ (e: ButtonEvent) => props.signupClick(e) }>Signup</button>
    </div>
  );
}
