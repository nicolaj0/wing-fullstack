import { Controller, Get } from '@nestjs/common';
import { TrackingService } from './trackingService';
import { Parcel } from './model/Parcel';
import * as fs from 'fs';
import { ParcelService } from './parcelService';
import { Item } from './model/Item';
import { Order } from './model/Order';
import { ApiResponse } from '@nestjs/swagger';
import { DropOperation } from './model/dropOperation';

@Controller()
export class AppController {
  constructor(private readonly appService: TrackingService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Generate parcels',
    type: DropOperation,
  })
  async generate(): Promise<DropOperation> {
    const orders = JSON.parse(fs.readFileSync('./data/orders.json', 'utf8'));
    const items = JSON.parse(fs.readFileSync('./data/items.json', 'utf8'));

    items.items = items.items.map((item) => new Item(item.id, item.weight, item.name));
    orders.orders = orders.orders.map((order) => new Order(order.id, order.items, order.date));

    const parcelService = new ParcelService();

    const parcels = parcelService.createParcelsFromOrders(orders.orders, items.items);

    for (const parcel of parcels) {
      parcel.tracking_id = await this.appService.getTrackingId(false);
    }

    const revenue = parcelService.calculateRevenue(parcels);

    return { revenue, parcels };
  }
}
