import React from 'react';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import { getItem } from "./Show";
import { EmptyItem, Item } from "../models/Item";
import { Element, InputEvent } from '../models/Types'

function formatFormDate(d: string): string {
  const date = new Date(d);
  return date.toISOString().substring(0,10);
}

function formatApiDate(d: string): string {
  const date = new Date(d);
  return date.toISOString().replace("Z", "");
}

function getOrElse<A>(a: A | undefined, def: A): A {
  return a? a : def;
}

function Form(props: {
  itemId?: string,
  authToken: string,
  onClick: (i: Item, e: InputEvent) => void,
  buttonText: string }): Element {

  const [item, setItem] = useState<Item>(EmptyItem());

  useEffect(() => {
    if(props.itemId) {
      getItem(props.authToken, props.itemId, (item: Item) => setItem(item))
    }
  }, [])

  function getIdOrUndefined(maybeId: string): string | undefined {
    return maybeId === "" ? undefined : maybeId;
  }

  function makeItem(): Item {
    return ({
      name: $("#name").val() as string,
      description: $("#description").val() as string,
      date_purchased: formatApiDate($("#datePurchased").val() as string),
      date_sold: formatApiDate($("#dateSold").val() as string),
      purchase_price: $("#purchasePrice").val() as number,
      sale_price: $("#salePrice").val() as number,
      category: $("#category").val() as string,
      where_sold: $("#whereSold").val() as string,
      storage_location: $("#storageLocation").val() as string,
      photos_taken: $("#photosTaken").is(":checked"),
      id: getIdOrUndefined($("#itemId").val() as string)
    });
  }

  return(
    <form>
      <div>Name<input type="text" id="name" value={item.name} onChange={() => setItem(makeItem())}></input></div>
      <div>Description<input type="text" id="description" value={item.description} onChange={() => setItem(makeItem())}></input></div>
      <div>Date Purchased<input type="date" id="datePurchased" value={formatFormDate(item.date_purchased)} onChange={() => setItem(makeItem())}></input></div>
      <div>Purchase Price<input type="number" id="purchasePrice" value={item.purchase_price} onChange={() => setItem(makeItem())}></input></div>
      <div>Category<input type="text" id="category" value={item.category} onChange={() => setItem(makeItem())}></input></div>
      <div>Storage Location<input type="text" id="storageLocation" value={item.storage_location} onChange={() => setItem(makeItem())}></input></div>
      <div>Photos Taken<input type="checkbox" id="photosTaken" checked={item.photos_taken} onChange={() => setItem(makeItem())}></input></div>
      <div>Date Sold<input type="date" id="dateSold" value={formatFormDate(getOrElse(item.date_sold, ""))} onChange={() => setItem(makeItem())}></input></div>
      <div>Sale Price<input type="number" id="salePrice" value={item.sale_price} onChange={() => setItem(makeItem())}></input></div>
      <div>Where Sold<input type="text" id="whereSold" value={item.where_sold} onChange={() => setItem(makeItem())}></input></div>
      <div><input type="hidden" id="itemId" value={getOrElse(item.id, "")} onChange={() => setItem(makeItem())}></input></div>
      <div><input type="submit" value={props.buttonText} onClick={
        (e: InputEvent) => {
          props.onClick(makeItem(), e)
        }
      }></input></div>
    </form>
  )
}

export function Add(props: {
  authToken: string,
  onClick: (i: Item, e: InputEvent) => void }): Element {

  return(
    <Form authToken={props.authToken} onClick={props.onClick} buttonText='Add'/>
  );
}

export function Edit(props: {
  itemId: string,
  authToken: string,
  onClick: (i: Item, e: InputEvent) => void }): Element {

  return(
    <Form
      itemId={props.itemId}
      authToken={props.authToken}
      onClick={props.onClick}
      buttonText='Update'
    />
  );
}
