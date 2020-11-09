import React from 'react';
import $ from 'jquery';
import { Element, InputEvent } from '../models/Types'

export function Signup(props: { onClick: (u: string, p: string, e: InputEvent) => void }): Element {
  function getUsername(): string {
    return $("#username").val() as string;
  }

  function getPassword(): string {
    return $("#password").val() as string;
  }

  return(
    <form className="centered">
      <div>Username: <input type="text" id="username"></input></div>
      <div>Password: <input type="password" id="password"></input></div>
      <div><input type="submit" value="Signup" onClick={
        (e: InputEvent) => props.onClick(getUsername(), getPassword(), e)
      }></input></div>
    </form>
  );
}
