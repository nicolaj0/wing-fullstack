import { Controller, Get } from '@nestjs/common';
import { TrackingService } from './trackingService';
import * as fs from 'fs';
import { ParcelService } from './parcelService';
import { Item } from './model/Item';
import { Order } from './model/Order';
import { ApiResponse } from '@nestjs/swagger';
import { DropOperation } from './model/dropOperation';
import _ = require('lodash');

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

    let paletteNumber = 0;
    for (const chunk of _.chunk(parcels, 15)) {
      const trackingId = await this.appService.getTrackingId(true);
      paletteNumber++;
      for (const parcel of chunk) {
        parcel.tracking_id = trackingId;
        parcel.palette_number = paletteNumber;
      }
    }

    const revenue = parcelService.calculateRevenue(parcels);

    return { revenue, parcels };
  }
}
