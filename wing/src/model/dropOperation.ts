//create class for dropOperation with revenue and array of parcels as properties
import { ApiProperty } from '@nestjs/swagger';
import { Parcel } from './Parcel';

export class DropOperation {
  //add apiProperty decorator to each property
  @ApiProperty()
  revenue: number;

  @ApiProperty({ type: Parcel, isArray: true })
  parcels: Parcel[];

  constructor(revenue: number, parcels: Parcel[]) {
    this.revenue = revenue;
    this.parcels = parcels;
  }
}
