import { ApiProperty } from '@nestjs/swagger';
import { ItemQuantity } from './ItemQuantity';

export class Parcel {
  @ApiProperty()
  order_id: string;

  @ApiProperty({ type: ItemQuantity, isArray: true })
  items: ItemQuantity[];

  @ApiProperty()
  weight: number;

  @ApiProperty()
  tracking_id: number;

  @ApiProperty()
  palette_number: number;

  constructor(
    order_id: string,
    items: ItemQuantity[],
    weight: number,
    tracking_id: number,
    palette_number: number
  ) {
    this.order_id = order_id;
    this.items = items;
    this.weight = weight;
    this.tracking_id = tracking_id;
    this.palette_number = palette_number;
  }
  calculateRevenue(): number {
    if (this.weight <= 1) {
      return 1;
    }
    if (this.weight <= 5) {
      return 2;
    }
    if (this.weight <= 10) {
      return 3;
    }
    if (this.weight <= 20) {
      return 5;
    }
    return 10;
  }
}
