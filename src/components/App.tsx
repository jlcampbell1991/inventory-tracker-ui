import React from 'react';
import $ from 'jquery';
import { useState } from 'react';
import { Add, Edit } from "./Forms";
import { Login } from "./Login";
import { NavBar } from "./NavBar";
import { Show } from "./Show";
import { Signup } from "./Signup";
import { Index } from "./Index";
import { Item } from "../models/Item";
import { Page } from "../models/Page";
import { ButtonEvent, Element, InputEvent } from '../models/Types'

interface SignupBody {
  name: string;
  unencPass: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export const App: () => Element = () => {
  const [authToken, setAuthToken] = useState<string>("");
  const [itemId, setItemId] = useState<string>("");
  const [page, setPage] = useState<Page>(Page.Login);


  function handleSignupClick(body: SignupBody, e: InputEvent): void {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/v1/signup',
        contentType: 'application/json',
        data: JSON.stringify(body),
        success: function(data) {
          setAuthToken(data);
        },
        complete: function() {
          setPage(Page.Index);
        },
        error: function(_, status, error) {
          alert(status + " - " + error);
          setPage(Page.Login);
        }
    });
  }

  function handleLoginClick(body: LoginBody, e: InputEvent): void {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/v1/login',
        contentType: 'application/json',
        data: JSON.stringify(body),
        success: function(data: string) {
          setAuthToken(data)
        },
        complete: () => {
          setPage(Page.Index);
        },
        error: function(_, status, error) {
          alert(status + " - " + error);
          setPage(Page.Login);
        }
    });
  }

  function handleClickLink(page: Page, e: ButtonEvent): void {
    e.preventDefault();
    setPage(page);
  }

  function handleAddClick(item: Item, e: InputEvent): void {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        headers: {
          "auth_token": authToken
        },
        url: 'http://localhost:8080/api/v1/item/create',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(item),
        success: function(_) {
          setPage(Page.Index);
        },
        error: function(_, status, error) {
          alert(status + " - " + error);
          setPage(Page.Login);
        }
    });
  }

  function handleEditClick(item: Item, e: InputEvent): void {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        headers: {
          "auth_token": authToken
        },
        url: `http://localhost:8080/api/v1/item/${item.id}/update`,
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function(_) {
          setPage(Page.Index);
        },
        error: function(_, status, error) {
          alert(status + " - " + error);
          setPage(Page.Login);
        }
    });
  }

  function handleShowClick(itemId: string | undefined, e: ButtonEvent) {
    e.preventDefault();
    if(itemId) {
      setItemId(itemId);
      setPage(Page.Show)
    }
  }

  function getPage(): Element {
    const login: Element = <Login onClick={ (u: string, p: string, e: InputEvent) => handleLoginClick({username: u, password: p}, e)} />;

    switch(page) {
      case 0:
        return login;
      case 1:
        return <Signup onClick={ (u: string, p: string, e: InputEvent) => handleSignupClick({name: u, unencPass: p}, e)} />;
      case 2:
        return <Index authToken={authToken} show={(itemId: string | undefined, e: ButtonEvent) => handleShowClick(itemId, e) } />;
      case 3:
        return <Add onClick={handleAddClick}/>;
      // case 4:
      //   return <Edit onClick={handleEditClick} />;
      case 5:
        return <Show authToken={authToken} itemId={itemId} />
      default:
        return login;
    }
  }

  return(
    <div>
      <NavBar isLoggedIn={true} onClick={(p: Page, e: ButtonEvent) => handleClickLink(p, e) }/>
      {getPage()}
    </div>
  );
}
