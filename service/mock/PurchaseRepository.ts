import { PurchaseUsecase } from '../../models/domain';
import { ReceiptObject, items } from '.';
import { Order } from '../../models/entity';

export class PurchaseRepository implements PurchaseUsecase {
  purchase = async (orders: Order[]) => {
    if (orders.find(order => !items.map(item => item.id).includes(order.id))) {
      throw new Error('알 수 없는 제품번호');
    }
    const receipt = orders.reduce((receipt, order) => {
      receipt.count += order.count;
      receipt.price += items.find(item => item.id === order.id).price * order.count;
      return receipt;
    }, new ReceiptObject(0, 0));
    return receipt;
  }
}