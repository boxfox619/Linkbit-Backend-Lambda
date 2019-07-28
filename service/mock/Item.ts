import { Item } from '../../models/entity';

export class ItemObject implements Item {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public tags: string[],
    public price: number,
    public stock: number
  ) { }
}