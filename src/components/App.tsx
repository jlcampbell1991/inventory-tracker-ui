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

  function handleSignupSubmit(body: SignupBody, e: InputEvent): void {
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

  function handleLoginSubmit(body: LoginBody, e: InputEvent): void {
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

  function handleAddSubmit(item: Item, e: InputEvent): void {
    e.preventDefault();
    console.log(JSON.stringify(item));
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

  function handleEditClick(itemId: string | undefined, e: ButtonEvent): void {
    e.preventDefault();
    if(itemId) {
      setItemId(itemId);
      setPage(Page.Edit);
    }
  }

  function handleUpdateSubmit(item: Item, e: InputEvent) {
    e.preventDefault();
    console.log(JSON.stringify(item));
    $.ajax({
        type: 'POST',
        headers: {
          "auth_token": authToken
        },
        url: `http://localhost:8080/api/v1/item/update`,
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(item),
        success: function(data: Item) {
          if(data.id) {
            // TODO: Simplify this
            setItemId(data.id);
            setPage(Page.Show);
          } else {
            setPage(Page.Index);
          }
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
      // TODO: Simplify this
      setItemId(itemId);
      setPage(Page.Show)
    }
  }

  function getPage(): Element {
    const login: Element = <Login
      loginSubmit={ (u: string, p: string, e: InputEvent) => handleLoginSubmit({username: u, password: p}, e)}
      signupClick={ (e: ButtonEvent) => handleClickLink(Page.Signup, e) }
    />;

    switch(page) {
      case 0:
        return login;
      case 1:
        return <Signup
          onClick={ (u: string, p: string, e: InputEvent) =>
              handleSignupSubmit({name: u, unencPass: p}, e)}
        />;
      case 2:
        return <Index
          authToken={authToken}
          getShow={(itemId: string | undefined, e: ButtonEvent) =>
            handleShowClick(itemId, e) }
          getEdit={(itemId: string | undefined, e: ButtonEvent) =>
            handleEditClick(itemId, e) }
        />;
      case 3:
        return <Add authToken={authToken} onClick={handleAddSubmit}/>;
      case 4:
        return <Edit
          authToken={authToken}
          itemId={itemId}
          onClick={handleUpdateSubmit}
        />;
      case 5:
        return <Show
          authToken={authToken}
          itemId={itemId}
          onClick={(itemId: string | undefined, e: ButtonEvent) =>
            handleEditClick(itemId, e) }
        />
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
