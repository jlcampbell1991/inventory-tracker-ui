import React from 'react';
import { Page } from "../models/Page"
import { ButtonEvent, Element } from '../models/Types'

export function NavBar(props: { isLoggedIn: boolean, onClick: (p: Page, e: ButtonEvent) => void }): Element {
  return(
    <nav className='navbar navbar-expand-md'>
      <h1 className='navbar-brand'>Campbell Inventory</h1>
      <div className='navbar-collapse'>
        <button className='nav-link button' onClick={ (e: ButtonEvent) => props.onClick(Page.Index, e) }>All Items</button>
        <button className='nav-link button' onClick={ (e: ButtonEvent) => props.onClick(Page.Add, e) }>Add Item</button>
      </div>
    </nav>
  )
}
