import React from 'react';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { Item } from "../models/Item";
import { ButtonEvent, Element } from '../models/Types'

function Row(props: {item: Item, onClick: (id: string | undefined, e: ButtonEvent) => void }): Element {
  return(
    <tr key={props.item.id}>
      <td>{props.item.name}</td>
      <td>{props.item.date_purchased}</td>
      <td>{props.item.category}</td>
      <td><button onClick={ (e: ButtonEvent) => props.onClick(props.item.id, e) }>Show</button></td>
    </tr>
  )
}

export const Index: (props: { authToken: string, show: (id: string | undefined, e: ButtonEvent) => void }) => Element = (props) => {
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
    <table>
      <tbody>
        <tr key='indexHeader'>
          <th>Name</th>
          <th>Date Purchased</th>
          <th>Category</th>
          <th></th>
        </tr>
        {items.map((item, _) => { return <Row item={item} onClick={props.show} /> })}
      </tbody>
    </table>
  )
}
