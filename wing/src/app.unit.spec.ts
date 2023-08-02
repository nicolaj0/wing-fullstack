//create unit tests parcel service

// Path: test\app.unit-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { Order } from './model/Order';
import { Item } from './model/Item';
import { ParcelService } from './parcelService';
import { TrackingService } from './trackingService';
import { Parcel } from './model/Parcel';

describe('AppController (unit)', () => {
  let parcelService: ParcelService;
  //create a new service instance before each test
  beforeEach(async () => {
    parcelService = new ParcelService();
  });

  describe('should create parcels with items', () => {
    it('should create 1 parcel when 1 item when 1 order with  1 item less then 30kg', () => {
      //create an order
      const order = new Order('1', [{ item_id: '1', quantity: 1 }], new Date());

      //create an item
      const item = new Item('1', '1.5', 'test');

      //create a parcel
      const parcel = parcelService.createParcelsFromOrders([order], [item]);

      //expect parcel to be defined
      expect(parcel).toBeDefined();

      //expect parcel to be an array
      expect(parcel).toBeInstanceOf(Array);

      //should have one parcel in the array
      expect(parcel.length).toBe(1);

      //should have one item in the parcel
      expect(parcel[0].items.length).toBe(1);

      //item in the parcel should have item_id 1
      expect(parcel[0].items[0].item_id).toBe('1');

      //check weight
      expect(parcel[0].weight).toBe(1.5);

      //check palette number
      expect(parcel[0].palette_number).toBe(1);
    });

    it('should create 2 parcel when more than 15 items of 1kg', () => {
      //create an order with 16 items
      const order = new Order('1', [{ item_id: '1', quantity: 16 }], new Date());

      //create an item
      const item = new Item('1', '1', 'test');

      //create a parcel
      const parcel = parcelService.createParcelsFromOrders([order], [item]);

      //expext parcel to contain 2 parcels
      expect(parcel.length).toBe(2);

      //expect first parcel to have an 1 item whith a quantity of 15
      expect(parcel[0].items.length).toBe(1);
      expect(parcel[0].items[0].quantity).toBe(15);
      expect(parcel[0].weight).toBe(15);

      //expect second parcel to have an 1 item whith a quantity of 1
      expect(parcel[1].items.length).toBe(1);
      expect(parcel[1].items[0].quantity).toBe(1);
      expect(parcel[1].weight).toBe(1);
    });

    it('should create 2 parcel when 1 order with mre than 15 items of sevaral items', () => {
      //create an order with 16 items
      const item1 = new Item('1', '1', 'test');
      const item2 = new Item('2', '1', 'test');
      const item3 = new Item('3', '1', 'test');
      const item4 = new Item('4', '1', 'test');

      //create an order with quantity of 1 for each item
      const order = new Order(
        '1',
        [
          { item_id: item1.id, quantity: 5 },
          { item_id: item2.id, quantity: 5 },
          { item_id: item3.id, quantity: 5 },
          { item_id: item4.id, quantity: 5 },
        ],
        new Date()
      );
      //create a parcel
      const parcel = parcelService.createParcelsFromOrders([order], [item1, item2, item3, item4]);

      //expext parcel to contain 2 parcels
      expect(parcel.length).toBe(2);

      expect(parcel[0].weight).toBe(15);
      expect(parcel[1].weight).toBe(5);
    });

    it('should create 2 parcel when weight is more than 30 kg ', () => {
      const item1 = new Item('1', '15', 'test');
      const item2 = new Item('2', '15', 'test');
      const item3 = new Item('3', '15', 'test');

      //create an order with quantity of 1 for each item
      const order = new Order(
        '1',
        [
          { item_id: item1.id, quantity: 1 },
          { item_id: item2.id, quantity: 1 },
          { item_id: item3.id, quantity: 1 },
        ],
        new Date()
      );

      //create a parcel
      const parcel = parcelService.createParcelsFromOrders([order], [item1, item2, item3]);

      //expext parcel to contain 2 parcels
      expect(parcel.length).toBe(2);

      //expect first parcel to have a weight of 30
      expect(parcel[0].weight).toBe(30);

      //expect second parcel to have a weight of 15
      expect(parcel[1].weight).toBe(15);
    });
  });

  describe('should calculate revenue', () => {
    //create a test for calculate revenue
    it('should calculate revenue with 1 parcel', () => {
      //create a parcel
      const parcel = new Parcel('1', [{ item_id: '1', quantity: 1 }], 1, 1, 1);

      //calculate revenue
      const revenue = parcelService.calculateRevenue([parcel]);

      expect(revenue).toBe(1);
    });

    it('should calculate revenue with 2 parcel', () => {
      //create a parcel
      const parcel1 = new Parcel('1', [{ item_id: '1', quantity: 1 }], 1, 1, 1);
      //create a parcel
      const parcel2 = new Parcel('1', [{ item_id: '1', quantity: 1 }], 1, 1, 1);

      //calculate revenue
      const revenue = parcelService.calculateRevenue([parcel1, parcel2]);

      expect(revenue).toBe(2);
    });
  });
});
