import React from 'react';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { Item } from "../models/Item";
import { ButtonEvent, Element } from '../models/Types'

function Row(props: {
  item: Item,
  getShow: (id: string | undefined, e: ButtonEvent) => void,
  getEdit: (id: string | undefined, e: ButtonEvent) => void }): Element {

  const date = new Date(props.item.date_purchased);

  return(
    <tr key={props.item.id} className="row">
      <td className='col'>{props.item.name}</td>
      <td className='col'>{date.toLocaleString()}</td>
      <td className='col'>{props.item.category}</td>
      <td className='col'><button onClick={ (e: ButtonEvent) => props.getShow(props.item.id, e) }>Show</button></td>
      <td className='col'><button onClick={ (e: ButtonEvent) => props.getEdit(props.item.id, e) }>Edit</button></td>
    </tr>
  )
}

export const Index: (props: {
  authToken: string,
  getShow: (id: string | undefined, e: ButtonEvent) => void,
  getEdit: (id: string | undefined, e: ButtonEvent) => void }) => Element = (props) => {
  const [items, setItems] = useState<Array<Item>>([])

  useEffect(() => {
    $.ajax({
        type: 'GET',
        headers: {
          "auth_token": props.authToken
        },
        url: 'http://localhost:8080/api/v1/items',
        success: function(data) {
          setItems(data);
        },
        error: function(_, status, error) {
          alert(status + " - " + error);
        }
    });
  }, [])

  return(
    <table className='container-fluid'>
      <tbody>
        <tr key='indexHeader' className='row'>
          <th className='col'>Name</th>
          <th className='col'>Date Purchased</th>
          <th className='col'>Category</th>
          <th className='col'></th>
          <th className='col'></th>
        </tr>
        {items.map((item, _) => { return <Row item={item} getShow={props.getShow} getEdit={props.getEdit} /> })}
      </tbody>
    </table>
  )
}
