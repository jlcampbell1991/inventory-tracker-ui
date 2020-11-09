import React from 'react';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { EmptyItem, Item } from "../models/Item";
import { Element } from '../models/Types'

export function Show(props: { authToken: string, itemId: string } ): Element {
  const [item, setItem] = useState<Item>(EmptyItem);

  useEffect(() => {
    $.ajax({
        type: 'GET',
        headers: {
          "auth_token": props.authToken
        },
        url: 'http://localhost:8080/api/v1/items',
        success: function(data) {
          setItem(data);
        },
        error: function(_, status, error) {
          alert(status + " - " + error);
        }
    });
  }, [])

  return(
    <div>
      <div>{item.name}</div>
      <div>{item.description}</div>
      <div>{item.date_purchased}</div>
      <div>{item.date_sold}</div>
      <div>{item.purchase_price}</div>
      <div>{item.sale_price}</div>
      <div>{item.category}</div>
      <div>{item.where_sold}</div>
      <div>{item.storage_location}</div>
      <div>{item.photos_taken}</div>
      <div>{item.id}</div>
    </div>
  );
}
