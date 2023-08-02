export class Order {
  id: string;
  items: { item_id: string; quantity: number }[];
  order_date: Date;

  constructor(id: string, items: { item_id: string; quantity: number }[], order_date: Date) {
    this.id = id;
    this.items = items;
    this.order_date = order_date;
  }
}
