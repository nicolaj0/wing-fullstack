import { Order } from './model/Order';
import { Parcel } from './model/Parcel';
import { Item } from './model/Item';
export class ParcelService {
  createParcelsFromOrders(orders: Order[], items: Item[]): Parcel[] {
    const parcels: Parcel[] = [];

    let currentItemCount = 0;
    let currentWeight = 0;
    let currentParcel: Parcel = undefined;

    orders.forEach((order) => {
      order.items.forEach((orderItem) => {
        const itemFromInventory = items.find((item) => item.id === orderItem.item_id);
        for (let i = 0; i < orderItem.quantity; i++) {
          if (currentItemCount === 0 || currentWeight + itemFromInventory.weight > 30) {
            currentParcel = new Parcel(order.id, [], 0, 0, parcels.length + 1);
            parcels.push(currentParcel);
            currentWeight = 0;
          }

          const item = currentParcel.items.find((item) => item.item_id === orderItem.item_id);
          if (item) {
            item.quantity += 1;
          } else {
            currentParcel.items.push({
              item_id: orderItem.item_id,
              quantity: 1,
            });
          }

          currentWeight += itemFromInventory.weight;
          currentParcel.weight += itemFromInventory.weight;

          currentItemCount += 1;
        }
      });
    });

    return parcels;
  }

  calculateRevenue(parcels: Parcel[]): number {
    let revenue = 0;
    parcels.forEach((parcel) => {
      revenue += parcel.calculateRevenue();
    });
    return revenue;
  }
}
