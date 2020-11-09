import React from 'react';
import { Page } from "../models/Page"
import { ButtonEvent, Element } from '../models/Types'

export function NavBar(props: { isLoggedIn: boolean, onClick: (p: Page, e: ButtonEvent) => void }): Element {
  return(
    <table className='flex'>
      <tbody><tr>
        <td><h1>Campbell Inventory</h1></td>
        <td><button onClick={ (e: ButtonEvent) => props.onClick(Page.Index, e) }>All Items</button></td>
        <td><button onClick={ (e: ButtonEvent) => props.onClick(Page.Add, e) }>Add Item</button></td>
      </tr></tbody>
    </table>
  )
}
