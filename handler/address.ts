import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { response } from '../models';
import { AddressUsecase } from '../domain/address';
import { CertificationUsecase } from '../domain/certification';

const handlers = (addressRepo: AddressUsecase, certRepo: CertificationUsecase): { [name: string]: APIGatewayProxyHandler } => ({
  getLinkAddress: middleware(
    async (param) => {
      const linkaddress = param.queryParams.linkaddress;
      const symbol = param.queryParams.symbol;
      try {
        const address = await addressRepo.getAddress(linkaddress, symbol);
        return response(200, { address });
      } catch (e) {
        console.error(e);
        return response(404, e.message);
      }
    },
    { queryParams: ['linkaddress', 'symbol'] }
  ),
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
        await addressRepo.linkAddress(linkaddress, accountaddress, symbol);
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
        await addressRepo.unlinkAddress(linkaddress, symbol);
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