import 'source-map-support/register';
import LinkHandler from '../models/handler/linkHandler';
import { middleware } from '../util/middleware';
import { response } from '../models/lambda';
import { LinkUsecase, AddressUsecase, CertificationUsecase } from '../models/domain';

const handlers = (addressRepo: AddressUsecase, linkRepo: LinkUsecase, certRepo: CertificationUsecase): LinkHandler => ({
    getAddressMap: middleware(
        async (param) => {
            const ownerAddress = param.queryParams.ownerAddress;
            const token = param.queryParams.token;
            try {
                const valid = await certRepo.checkValidation(ownerAddress, token);
                if (!valid) return response(400, 'invalid certification token');
                const address = await linkRepo.getAddressMap(ownerAddress);
                return response(200, address);
            } catch (e) {
                console.error(e);
                return response(404, e.message);
            }
        },
        { queryParams: ['ownerAddress', 'token'] }
    ),
    getLinkAddress: middleware(
        async (param) => {
            const linkaddress = param.queryParams.linkaddress;
            const symbol = param.queryParams.symbol;
            try {
                const address = await linkRepo.getLinkAddress(linkaddress, symbol);
                return response(200, { address });
            } catch (e) {
                console.error(e);
                return response(404, e.message);
            }
        },
        { queryParams: ['linkaddress', 'symbol'] }
    ),
    linkAddress: middleware(
        async (param) => {
            const token = param.body.token;
            const linkaddress = param.body.linkaddress;
            const accountaddress = param.body.accountaddress;
            const symbol = param.body.symbol;
            try {
                const ownerAddress = await addressRepo.getOwner(linkaddress);
                const valid = await certRepo.checkValidation(ownerAddress, token);
                if (!valid) return response(400, 'invalid certification token');
                await linkRepo.linkAddress(linkaddress, accountaddress, symbol);
                return response(200);
            } catch (e) {
                console.error(e);
                return response(500, 'error');
            }
        },
        { body: ['token', 'linkaddress', 'accountaddress', 'symbol'] }
    ),
    unlinkAddress: middleware(
        async (param) => {
            const token = param.body.token;
            const linkaddress = param.body.linkaddress;
            const symbol = param.body.symbol;
            try {
                const ownerAddress = await addressRepo.getOwner(linkaddress);
                const valid = await certRepo.checkValidation(ownerAddress, token);
                if (!valid) return response(400, 'invalid certification token');
                await linkRepo.unlinkAddress(linkaddress, symbol);
                return response(200);
            } catch (e) {
                console.error(e);
                return response(500, 'error');
            }
        },
        { body: ['token', 'linkaddress', 'symbol'] }
    )
})

export default handlers;