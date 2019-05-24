import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { CertificationRepository } from '../service/certificationRepository';
import { middleware } from '../util/middleware';
import { AddressRepository } from '../service/addressRepository';
import { response, createDBClient } from '../models';

const addressRepo = new AddressRepository(createDBClient());
const certRepo = new CertificationRepository(createDBClient());

export const getLinkAddress: APIGatewayProxyHandler = middleware(
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
)

export const createAddress: APIGatewayProxyHandler = middleware(
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
      return response(500, 'error');
    }
  },
  { body: ['ownerAddress', 'token', 'linkaddress'] }
)

export const linkAddress: APIGatewayProxyHandler = middleware(
  async (param) => {
    const ownerAddress = param.queryParams.ownerAddress;
    const token = param.queryParams.token;
    const linkaddress = param.queryParams.linkaddress;
    const accountaddress = param.queryParams.accountaddress;
    const symbol = param.queryParams.symbol;
    try {
      const valid = await certRepo.checkValidation(ownerAddress, token);
      if (!valid) return response(400, 'invalid certification token');
      await addressRepo.linkAddress(linkaddress, accountaddress, symbol);
      return response(200);
    } catch (e) {
      console.error(e);
      return response(500, 'error');
    }
  },
  { queryParams: ['ownerAddress', 'token', 'linkaddress', 'accountaddress', 'symbol'] }
)
