import { Usecase } from '.';
import { Item } from '../entity';

export interface ItemUsecase extends Usecase {
  getItems(): Promise<Item[]>;
}