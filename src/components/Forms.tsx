import React from 'react';
import $ from 'jquery';
import { Item } from "../models/Item";
import { Element, InputEvent } from '../models/Types'

function Form(props: { item?: Item, onClick: (i: Item, e: InputEvent) => void }): Element {
  function makeItem(): Item {
    return ({
      name: $("#name").val() as string,
      description: $("#description").val() as string,
      date_purchased: new Date($("#datePurchased").val() as string).toISOString().replace("Z", ""),
      date_sold: new Date($("#dateSold").val() as string).toISOString().replace("Z", ""),
      purchase_price: $("#purchasePrice").val() as number,
      sale_price: $("#salePrice").val() as number,
      category: $("#category").val() as string,
      where_sold: $("#whereSold").val() as string,
      storage_location: $("#storageLocation").val() as string,
      photos_taken: $("#photosTaken").is(":checked")
    });
  }

  const date = new Date();

  return(
    <form>
      <div>Name<input type="text" id="name"></input></div>
      <div>Description<input type="text" id="description"></input></div>
      <div>Date Purchased<input type="date" id="datePurchased" value={date.toISOString().substring(0,10)}></input></div>
      <div>Purchase Price<input type="number" id="purchasePrice"></input></div>
      <div>Category<input type="text" id="category"></input></div>
      <div>Storage Location<input type="text" id="storageLocation"></input></div>
      <div>Photos Taken<input type="checkbox" id="photosTaken"></input></div>
      <div>Date Sold<input type="date" id="dateSold" value={date.toISOString().substring(0,10)}></input></div>
      <div>Sale Price<input type="number" id="salePrice"></input></div>
      <div>Where Sold<input type="text" id="whereSold"></input></div>
      <div><input type="submit" value="add" onClick={
        (e: InputEvent) => {
          console.log(makeItem());
          props.onClick(makeItem(),e)
        }
      }></input></div>
    </form>
  )
}

export function Add(props: { onClick: (i: Item, e: InputEvent) => void }): Element {
  return(
    <Form onClick={props.onClick} />
  );
}

export function Edit(props: { item: Item, onClick: (i: Item, e: InputEvent) => void }): Element {
  return(
    <Form item={props.item} onClick={props.onClick} />
  );
}
