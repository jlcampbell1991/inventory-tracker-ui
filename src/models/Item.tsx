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

export const EmptyItem =
{
  name: "",
  description: "",
  date_purchased: "",
  date_sold: "",
  purchase_price: 0,
  sale_price: 0,
  category: "",
  where_sold: "",
  storage_location: "",
  photos_taken: false,
  id: ""
}
