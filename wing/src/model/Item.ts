//create an item class with properties id
// weight
// name

export class Item {
  id: string;
  weight: number;
  name: string;
  constructor(id: string, weight: string, name: string) {
    this.id = id;
    this.weight = Number(weight);
    this.name = name;
  }
}
