import { Order } from '../../models/entity';

export class OrderObject implements Order {
  constructor(
    public id: number,
    public count: number
  ) { }
}