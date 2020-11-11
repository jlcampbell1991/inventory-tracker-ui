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
      <th scope="row">{props.item.name}</th>
      <td>{date.toLocaleString()}</td>
      <td>{props.item.category}</td>
      <td><button onClick={ (e: ButtonEvent) => props.getShow(props.item.id, e) }>Show</button></td>
      <td><button onClick={ (e: ButtonEvent) => props.getEdit(props.item.id, e) }>Edit</button></td>
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
    <div id="index-container" className='container-fluid'>
      <table className='table'>
        <thead className='thead-light'>
          <tr key='indexHeader' className='row'>
            <th scope='col'>Name</th>
            <th scope='col'>Date Purchased</th>
            <th scope='col'>Category</th>
            <th scope='col'>#</th>
            <th scope='col'>#</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, _) => { return <Row item={item} getShow={props.getShow} getEdit={props.getEdit} /> })}
        </tbody>
      </table>
    </div>
  )
}
