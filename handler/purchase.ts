import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { response } from '../models/lambda';
import { PurchaseUsecase } from '../models/domain';
import { ErrorMessage } from '../models/entity';
import PurchaseHandler from '../models/handler/PurchaseHandler';

const handlers = (purchaseRepo: PurchaseUsecase): PurchaseHandler => ({
    purchase: middleware(
        async (param) => {
            const orders = param.body.orders;
            try {
                const receipt = await purchaseRepo.purchase(orders);
                return response(200, receipt);
            } catch (e) {
                console.error(e);
                return response(404, { title: '서버 에러', reason: e.message } as ErrorMessage);
            }
        },
        { body: ['orders'] }
    )
})

export default handlers;