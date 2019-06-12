import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { response } from '../models';
import { AddressUsecase } from '../domain/address';
import { CertificationUsecase } from '../domain/certification';

interface AddressHandler {
  createAddress: APIGatewayProxyHandler,
  deleteAddress: APIGatewayProxyHandler
}

const handlers = (addressRepo: AddressUsecase, certRepo: CertificationUsecase): AddressHandler => ({
  createAddress: middleware(
    async (param) => {
      const ownerAddress = param.body.ownerAddress;
      const token = param.body.token;
      const linkaddress = param.body.linkaddress;
      try {
        const valid = await certRepo.checkValidation(ownerAddress, token);
        if (!valid) return response(400, 'invalid certification token');
        await addressRepo.createAddress(linkaddress, ownerAddress);
        return response(200);
      } catch (e) {
        console.error(e);
        return response(500, e.message);
      }
    },
    { body: ['ownerAddress', 'token', 'linkaddress'] }
  ),
  deleteAddress: middleware(
    async (param) => {
      const token = param.body.token;
      const linkaddress = param.body.linkaddress;
      try {
        const ownerAddress = await addressRepo.getOwner(linkaddress);
        const valid = await certRepo.checkValidation(ownerAddress, token);
        if (!valid) return response(400, 'invalid certification token');
        await addressRepo.deleteAddress(linkaddress);
        return response(200);
      } catch (e) {
        console.error(e);
        return response(500, e.message);
      }
    },
    { body: ['token', 'linkaddress'] }
  )
})

export default handlers;