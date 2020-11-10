export interface Item {
  name: string;
  description: string;
  date_purchased: string;
  date_sold?: string;
  purchase_price: number;
  sale_price?: number;
  category: string;
  where_sold?: string;
  storage_location: string;
  photos_taken: boolean;
  id?: string
}

export function EmptyItem(): Item {
  const date: Date = new Date();

  return(
    {
      name: "",
      description: "",
      date_purchased: date.toISOString().substring(0,10),
      date_sold: date.toISOString().substring(0,10),
      purchase_price: 0,
      sale_price: 0,
      category: "",
      where_sold: "",
      storage_location: "",
      photos_taken: false,
      id: undefined
    }
  )
}
