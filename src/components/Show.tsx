import React from 'react';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { EmptyItem, Item } from "../models/Item";
import { ButtonEvent, Element } from '../models/Types'

export function getItem(authToken: string, itemId: string, callBack: (item: Item) => void) {
  $.ajax({
      type: 'GET',
      headers: {
        "auth_token": authToken
      },
      url: `http://localhost:8080/api/v1/item/${itemId}`,
      success: function(data: Item) {
        callBack(data);
      },
      error: function(_, status, error) {
        alert(status + " - " + error);
      }
  });
}

export function Show(props: {
  authToken: string,
  itemId: string,
  onClick: (itemId: string | undefined, e: ButtonEvent) => void }): Element {
    
  const [item, setItem] = useState<Item>(EmptyItem);

  useEffect(() => {
    getItem(props.authToken, props.itemId, (item: Item) => setItem(item))
  }, [])

  return(
    <div>
      <div>{item.name}</div>
      <div>{item.description}</div>
      <div>Date Purchased: {item.date_purchased}</div>
      <div>Date Sold: {item.date_sold}</div>
      <div>Purchase Price: {item.purchase_price}</div>
      <div>Sale Price: {item.sale_price}</div>
      <div>Category: {item.category}</div>
      <div>Where Sold: {item.where_sold}</div>
      <div>Storage Location: {item.storage_location}</div>
      <div>Photos Taken?:  {item.photos_taken.toString()}</div>
      <div><button onClick={ (e: ButtonEvent) => props.onClick(item.id, e) }>Edit</button></div>
    </div>
  );
}
