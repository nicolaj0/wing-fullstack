import { ApiProperty } from '@nestjs/swagger';

export class ItemQuantity {
  @ApiProperty()
  item_id: string;

  @ApiProperty()
  quantity: number;

  constructor(item_id: string, quantity: number) {
    this.item_id = item_id;
    this.quantity = quantity;
  }
}
