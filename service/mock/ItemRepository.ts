import { ItemUsecase } from '../../models/domain';
import { items } from '.';


export class ItemRepository implements ItemUsecase {
  getItems = async () => {
    return items;
  }

}