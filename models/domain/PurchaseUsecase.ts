import { Usecase } from '.';
import { Order, Receipt } from '../entity';

export interface PurchaseUsecase extends Usecase {
  purchase(order: Order[]): Promise<Receipt>;
}